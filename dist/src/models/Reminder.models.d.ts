import { JobOptions } from "bull";
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
    jobId?: string;
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
    jobId?: string;
    eventSchedule: Date;
    reminderTime: Date;
    createdAt: Date;
}
declare const ReminderJobModel: mongoose.Model<IReminder, {}, {}, {}, mongoose.Document<unknown, {}, IReminder> & IReminder & {
    _id: mongoose.Types.ObjectId;
}, any>;
export type { IReminder };
export { ReminderJobModel, Reminder };
