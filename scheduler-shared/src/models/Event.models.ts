import Joi from 'joi'
import { IReminder, Reminder } from './Reminder.models';
import { BQJobStatus } from './BullQ.models';
import { APIErr, APIRes, APIStatus } from '../utils/APIutils';
import mongoose, { Mongoose, Schema, mongo } from 'mongoose';
/**
 * [PATH] src/models/event.ts
 * This file contains the event model which represents an event in the database.
 * It also contains the validation logic for the event model.
 */
export interface IBatchData {
  create?: IEvent[];
  update?: { id: string; data: Partial<IEvent> }[];
  deleteIds?: string[];
}


export interface IEvent {
  _id?: string;
  title: string;
  description: string;
  location: string;
  venue: string;
  eventSchedule: Date;
  participants: number;
  createdAt: Date;
  jobs: Partial<IReminder>[];
}
// const joiEventSchema = Joi.object({
//   _id: Joi.object().optional(),
//   __v: Joi.number().optional(),
//   title: Joi.string().required(),
//   description: Joi.string().required(),
//   location: Joi.string().required(),
//   venue: Joi.string().required(),
//   eventSchedule: Joi.date().iso().required(),
//   participants: Joi.number().integer().min(0).required(),
//   jobs: Joi.array().items().empty().optional(),
//   createdAt: Joi.date().iso().optional(),
// });
export const IEventValidator = Joi.object({
  _id: Joi.any().optional(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  venue: Joi.string().required(),
  eventSchedule: Joi.date().greater('now').required(),
  participants: Joi.number().required(),
  createdAt: Joi.date().optional(),
  jobs: Joi.array().items(Joi.any()).optional()
});
export const IEventValidatorPartial = Joi.object({
  _id: Joi.any().optional(),
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  location: Joi.string().optional(),
  venue: Joi.string().optional(),
  eventSchedule: Joi.date().greater('now').optional(),
  participants: Joi.number().optional(),
  createdAt: Joi.date().optional(),
  jobs: Joi.array().items(Joi.any()).optional()
});
/**
 * @param event - The event object to validate.
 * @throws {APIErr} If the event object is not valid.
 */
export function isEventValid(event: any): void {
  const { error } = IEventValidator.validate(event);
  if (error) {
    throw new APIErr(APIStatus.BAD_REQUEST, error.message);
  }
}

/**
 * Validates an event object using the IEventValidatorPartial schema.
 * @param event - The event object to validate.
 * @throws {APIErr} If the event object is not valid.
 */
export function isPartialEventValid(event: any): void {
  const { error } = IEventValidatorPartial.validate(event);
  if (error) {
    throw new APIErr(APIStatus.BAD_REQUEST, error.message);
  }
}


export default IEventValidator;

const joiPartialEventSchema = Joi.object({
  _id: Joi.any().optional(),
  __v: Joi.number().optional(),
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  location: Joi.string().optional(),
  venue: Joi.string().optional(),
  eventSchedule: Joi.date().iso().required(),
  participants: Joi.number().integer().min(0).optional(),
  jobs: Joi.array().items().empty().optional(),
  createdAt: Joi.date().iso().optional(),
});
const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  venue: { type: String, required: true },
  eventSchedule: { type: Date, required: true },
  participants: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  jobs: { type: Array, default: [] },
});

export function validatePartialEvent(event: Partial<IEvent>) {
  const { error } = joiPartialEventSchema.validate(event, { context: { now: new Date() } });
  if (error) {
    throw new APIErr(APIStatus.BAD_REQUEST, error.message);
  }
}
export const EventModel = mongoose.model<IEvent>('Event', EventSchema);
