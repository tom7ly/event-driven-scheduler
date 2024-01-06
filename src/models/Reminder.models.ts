import Bull, { JobOptions } from "bull";
import mongoose from "mongoose";
import { BQType, IBQJob } from "./BullQ.models";


class Reminder implements IReminder {
    readonly createdAt: Date;
    readonly reminderTime: Date;
    jobId?: Bull.JobId;
    readonly type: BQType = BQType.REMINDERS;


    constructor(
        public title: string,
        public eventSchedule: Date,
        public eventId: string,
        public options: JobOptions = { delay: 0, priority: 0, repeat: { every: 0 } },
        public timeBefore: {
            hours: number
            minutes: number,
            days: number
        } = { hours: 0, minutes: 30, days: 0 }
    ) {
        this.eventId = eventId
        this.title = title
        this.eventSchedule = eventSchedule
        this.createdAt = new Date();
        this.reminderTime = this.calculateReminderTime(this.eventSchedule);
        this.options = { ...options, delay: this.reminderTime.getTime() - new Date().getTime() };

    }

    private calculateReminderTime(eventSchedule: Date): Date {
        const reminderTime = new Date(eventSchedule);
        reminderTime.setHours(reminderTime.getHours() - this.timeBefore.hours ?? 0);
        reminderTime.setMinutes(reminderTime.getMinutes() - this.timeBefore.minutes ?? 30);
        reminderTime.setDate(reminderTime.getDate() - this.timeBefore.days ?? 0);
        reminderTime.setMinutes(reminderTime.getMinutes() - 30);
        return reminderTime;
    }
    public calculateDelay(): number {
        return this.reminderTime.getTime() - new Date().getTime();
    }
}

interface IReminder {
    _id?: any;
    title: string;
    eventId: string
    jobId?: Bull.JobId;
    eventSchedule: Date
    reminderTime: Date
    createdAt: Date;

}
const reminderSchema = new mongoose.Schema({
    eventId: { type: String, required: true },
    jobId: { type: String, required: false },
    title: { type: String, required: true },
    eventSchedule: { type: Date, required: true },
    reminderTime: { type: Date, required: true },
    createdAt: { type: Date, required: true },
    type: { type: String, required: true },
});

const ReminderJobModel = mongoose.model<IReminder>('Reminder', reminderSchema);
export type { IReminder };
export { ReminderJobModel, Reminder };