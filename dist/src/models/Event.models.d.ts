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
