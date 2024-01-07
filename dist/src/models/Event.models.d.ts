/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { IReminder } from './Reminder.models';
import mongoose from 'mongoose';
/**
 * [PATH] src/models/event.ts
 * This file contains the event model which represents an event in the database.
 * It also contains the validation logic for the event model.
 */
export interface IBatchData {
    create?: IEvent[];
    update?: {
        id: string;
        data: Partial<IEvent>;
    }[];
    deleteIds?: string[];
}
export interface IEvent {
    _id?: any;
    title: string;
    description: string;
    location: string;
    venue: string;
    eventSchedule: Date;
    participants: number;
    createdAt: Date;
    jobs: Partial<IReminder>[];
}
export declare function validateEvent(event: IEvent): void;
export declare function validatePartialEvent(event: Partial<IEvent>): void;
export declare const EventModel: mongoose.Model<IEvent, {}, {}, {}, mongoose.Document<unknown, {}, IEvent> & IEvent & {
    _id: mongoose.Types.ObjectId;
}, any>;
