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
import Bull, { JobOptions } from "bull";
import mongoose from "mongoose";
import { BQType } from "./BullQ.models";
declare class Reminder implements IReminder {
    title: string;
    eventSchedule: Date;
    eventId: string;
    options: JobOptions;
    timeBefore: {
        hours: number;
        minutes: number;
        days: number;
    };
    readonly createdAt: Date;
    readonly reminderTime: Date;
    jobId?: Bull.JobId;
    readonly type: BQType;
    constructor(title: string, eventSchedule: Date, eventId: string, options?: JobOptions, timeBefore?: {
        hours: number;
        minutes: number;
        days: number;
    });
    private calculateReminderTime;
    calculateDelay(): number;
}
interface IReminder {
    _id?: any;
    title: string;
    eventId: string;
    jobId?: Bull.JobId;
    eventSchedule: Date;
    reminderTime: Date;
    createdAt: Date;
}
declare const ReminderJobModel: mongoose.Model<IReminder, {}, {}, {}, mongoose.Document<unknown, {}, IReminder> & IReminder & {
    _id: mongoose.Types.ObjectId;
}, any>;
export type { IReminder };
export { ReminderJobModel, Reminder };
