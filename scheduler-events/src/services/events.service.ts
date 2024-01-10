import { rabbitMQService } from "./external-services";
import { IReminder } from "scheduler-shared/dist/models/Reminder.models";
import { EventModel, IEvent } from "scheduler-shared/dist/models/Event.models";
import { eventsController } from "../controllers/events-controller";
import { RMQExchange, RMQKeys } from "scheduler-shared/dist/services/RabbitMQ/consts";
import { IRMQMessage } from "scheduler-shared/dist/services/RabbitMQ/RMQService";

export class EventsService {
    initConsumers = async () => {
        rabbitMQService.subscribe({ exchange: RMQExchange.REMINDERS, key: RMQKeys.REMINDERS.CREATED }, this.onReminderCreated.bind(this));
        rabbitMQService.subscribe({ exchange: RMQExchange.REMINDERS, key: RMQKeys.REMINDERS.DELETED }, this.onReminderDeleted.bind(this));
    }
    onEvent = async (message: IRMQMessage<IReminder>): Promise<void> => {
        message.routingKey === RMQKeys.REMINDERS.CREATED ? this.onReminderCreated(message) : this.onReminderDeleted(message);
    }
    onReminderDeleted = async (message: IRMQMessage<IReminder>): Promise<void> => {
        try {
            const reminder = message.data;
            const updatedEvent: IEvent = await this.removeReminderFromEvent(reminder.eventId, reminder);
            rabbitMQService.publish(
                RMQKeys.EVENTS.ROOT, { data: updatedEvent, message: `Deleted reminder from event ${updatedEvent}` });
        } catch (error) {
            rabbitMQService.publish(RMQKeys.EVENTS.ERROR, error);
            console.error('Failed to update event:', error);
        }
    }

    onReminderCreated = async (message: IRMQMessage<IReminder>): Promise<void> => {
        try {
            const reminder = message.data;
            const updatedEvent: IEvent = await this.addReminderToEvent(reminder.eventId, reminder);
            rabbitMQService.publish<IEvent>(RMQKeys.EVENTS.ROOT, {
                data: updatedEvent, message: `updated event ${updatedEvent} with reminder ${reminder._id}`
            });
        } catch (error) {
            rabbitMQService.publish(RMQKeys.EVENTS.ERROR, error);
            console.error('Failed to update event:', error);
        }
    }

    removeReminderFromEvent = async (eventId: string, reminder: IReminder): Promise<IEvent> => {
        try {
            const event: IEvent = await eventsController.getEventById(eventId);
            event.jobs = event.jobs.filter(job => job.jobId !== reminder.jobId);
            return await eventsController.updateEvent(eventId, event);
        } catch (error) {
            rabbitMQService.publish(RMQKeys.EVENTS.ERROR, error);
            console.error('Failed to update event:', error);
        }
    }

    addReminderToEvent = async (eventId: string, reminder: IReminder): Promise<IEvent> => {
        try {
            const event: IEvent = await eventsController.getEventById(eventId);
            event.jobs.push({ jobId: reminder.jobId, reminderTime: reminder.reminderTime });
            return await eventsController.updateEvent(eventId, event).then(event => {
                rabbitMQService.publish(RMQKeys.EVENTS.ROOT, { data: event, message: `updated event ${event} with reminder ${reminder._id}` });
                return event;
            })
        } catch (error) {
            rabbitMQService.publish(RMQKeys.EVENTS.ERROR, error);
            console.error('Failed to update event:', error);
        }
    }
}

export const eventsService = new EventsService();