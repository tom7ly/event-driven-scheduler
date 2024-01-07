import Joi from 'joi';
import { APIErr, APIStatus } from '../utils/APIutils';
import mongoose, { Schema } from 'mongoose';
const joiEventSchema = Joi.object({
    _id: Joi.object().optional(),
    __v: Joi.number().optional(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    venue: Joi.string().required(),
    eventSchedule: Joi.date().iso().required(),
    participants: Joi.number().integer().min(0).required(),
    jobs: Joi.array().items().empty().optional(),
    createdAt: Joi.date().iso().optional(),
});
export function validateEvent(event) {
    const { error } = joiEventSchema.validate(event);
    if (error) {
        throw new APIErr(APIStatus.BAD_REQUEST, error.message);
    }
    const eventDateTime = new Date(event.eventSchedule);
    if (eventDateTime < new Date()) {
        throw new APIErr(APIStatus.BAD_REQUEST, '"eventSchedule.date" and "eventSchedule.time" must be either the current date/time or later');
    }
}
const joiPartialEventSchema = Joi.object({
    _id: Joi.object().optional(),
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
const EventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    venue: { type: String, required: true },
    eventSchedule: { type: Date, required: true },
    participants: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    jobs: { type: Array, default: [] },
});
export function validatePartialEvent(event) {
    const { error } = joiPartialEventSchema.validate(event, { context: { now: new Date() } });
    if (error) {
        throw new APIErr(APIStatus.BAD_REQUEST, error.message);
    }
}
export const EventModel = mongoose.model('Event', EventSchema);
