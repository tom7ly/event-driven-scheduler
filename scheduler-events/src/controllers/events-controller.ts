import mongoose from 'mongoose';
import { APIErr, APIRes, APIResBase, APIStatus, IAPIRes } from 'scheduler-shared/dist/utils/APIutils'
import { IEvent, EventModel, validatePartialEvent, IBatchData, isEventValid } from 'scheduler-shared/dist/models/Event.models';
import { rabbitMQService } from '../services/external-services';
import { IEventsQueryParams, eventUtils } from '../utils/events.utils';
import { RMQExchange, RMQKeys } from 'scheduler-shared/dist/services/RabbitMQ/consts';
import { isMongoId } from 'scheduler-shared/dist/utils/helpers'
/**
 * [PATH] src/controllers/events-controller.ts
 * This file contains the events controller which handles the business logic for the events API.
 * This is class is used as a singleton across the application.
 */

export class EventsController {
  private handleError(error: Error) {
    console.log(error);
    rabbitMQService.publish(RMQKeys.EVENTS.ERROR, "error");
    if (error instanceof APIErr) {
      throw error;
    }
    throw new APIErr(APIStatus.INTERNAL_SERVER_ERROR, "Internal server error");
  }
  private async getEventByData(event: IEvent): Promise<IEvent> {
    const existingEvent = await EventModel.findOne({
      eventSchedule: event.eventSchedule,
      location: event.location,
      venue: event.venue,
    }).lean();
    if (!existingEvent) {
      return null;
    }
    return existingEvent;
  }
  async getEvents(params: IEventsQueryParams): Promise<IEvent[]> {
    try {
      //  cosnt query = eventUtils.(venue, location, sortBy);
      const { query, sortOptions } = eventUtils.getEventsQuery(params);
      const events = await EventModel.find(query).sort(sortOptions).lean();
      return events;
    } catch (error) {
      this.handleError(error);
    }
  }


  7
  async getEventById(eventId: string): Promise<IEvent> {
    try {
      if (!eventId) {
        throw new APIErr(APIStatus.BAD_REQUEST, "Event ID is required");
      }
      const event: IEvent = await EventModel.findById(eventId).lean()
      if (!event) {
        throw new APIErr(APIStatus.NOT_FOUND, 'Event not found');
      }
      return event
    } catch (error) {
      this.handleError(error);
    }
  }

  async scheduleEvent(event: IEvent): Promise<IEvent> {
    try {
      isEventValid(event)
      const existingEvent = await this.getEventByData(event);
      if (existingEvent) {
        throw new APIErr(APIStatus.BAD_REQUEST, 'Another event already scheduled in the same location and venue at the same time');
      }
      return (await EventModel.create(event)).toObject();
    } catch (error) {
      this.handleError(error);
    }
  }



  async updateEvent(eventId: string, updatedData: Partial<IEvent>): Promise<IEvent> {
    try {
      if (!eventId) {
        throw new APIErr(APIStatus.BAD_REQUEST, "Event ID is required");
      }
      validatePartialEvent(updatedData);
      const updatedEvent = await EventModel.findByIdAndUpdate(eventId, updatedData, { new: true });
      if (!updatedEvent) {
        throw new APIErr(APIStatus.NOT_FOUND, 'Event not found');
      }
      return updatedEvent
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteEvent(eventId: string): Promise<IEvent> {
    try {
      if (!eventId) {
        throw new APIErr(APIStatus.BAD_REQUEST, "Event ID is required");
      }
      const event = await EventModel.findById(eventId);
      if (!event) {
        throw new APIErr(APIStatus.NOT_FOUND, 'Event not found');
      }

      const deletedEvent = await EventModel.findByIdAndDelete(eventId, { new: false })
      if (!deletedEvent) {
        throw new APIErr(APIStatus.NOT_FOUND, 'Event not found');
      }
      return deletedEvent;
    } catch (error) {
      this.handleError(error);
    }
  }


  private batchHandleError(operation: string, itemId: string, error: Error, errors: string[]) {
    console.log(error);
    const errorMessage = `Error ${operation} for item with ID ${itemId}: ${error.message}`;
    console.log(errorMessage);
    errors.push(errorMessage);
  }

  private batchHandleAPIError(error: Error, errors: string[]) {
    console.log(error);
    rabbitMQService.publish(RMQKeys.EVENTS.ERROR, error);
    if (error instanceof APIErr) {
      throw error;
    }
    throw new APIErr(APIStatus.INTERNAL_SERVER_ERROR, error.message, null, errors);
  }

  private async handleBatchOperation(operation: Function, items: any[], operationName: string): Promise<IAPIRes> {
    const errors: string[] = [];
    const result: IAPIRes = { data: [] };

    try {
      await Promise.all(
        items.map(async (item) => {
          try {
            const res = await operation(item);
            result.data.push({ status: 'success', event: res.data });
          } catch (error) {
            this.batchHandleError(operationName, item._id || item.id, error, errors);
          }
        })
      );

      if (errors.length > 0) {
        result.status = APIStatus.PARTIAL_SUCCESS;
        result.message = 'Some operations completed with errors';
        result.errors = errors;
      }

      return result;
    } catch (error) {
      this.batchHandleAPIError(error, errors);
    }
  }

  async batchCreate(eventsData: IEvent[]): Promise<IAPIRes> {
    return this.handleBatchOperation(this.scheduleEvent, eventsData, 'scheduling reminder');
  }

  async batchUpdate(updates: { id: string; data: Partial<IEvent> }[]): Promise<IAPIRes> {
    return this.handleBatchOperation(this.updateEvent, updates, 'updating event');
  }

  async batchDelete(ids: string[]): Promise<IAPIRes> {
    return this.handleBatchOperation(this.deleteEvent, ids, 'deleting event');
  }

  async batchOperations(data: IBatchData): Promise<IAPIRes> {
    const result = new APIResBase();
    const errors: string[] = [];

    try {
      const { create, update, deleteIds } = data;

      if (create && create.length > 0) {
        const createResult = await this.batchCreate(create);
        result.data = { create: createResult.data };
        if (createResult.status === APIStatus.PARTIAL_SUCCESS) {
          errors.push(...createResult.errors);
        }
      }

      if (update && update.length > 0) {
        const updateResult = await this.batchUpdate(update);
        result.data = { ...result.data, update: updateResult.data };
        if (updateResult.status === APIStatus.PARTIAL_SUCCESS) {
          errors.push(...updateResult.errors);
        }
      }

      if (deleteIds && deleteIds.length > 0) {
        const deleteResult = await this.batchDelete(deleteIds);
        result.data = { ...result.data, delete: deleteResult.data };
        if (deleteResult.status === APIStatus.PARTIAL_SUCCESS) {
          errors.push(...deleteResult.errors);
        }
      }

      if (errors.length > 0) {
        result.status = APIStatus.PARTIAL_SUCCESS;
        result.errors = errors;
      }

      return result;
    } catch (error) {
      this.batchHandleAPIError(error, errors);
    }
  }
}
export const eventsController = new EventsController();

