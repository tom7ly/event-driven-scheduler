import mongoose from "mongoose";
import { BQType } from "./BullQ.models";
class Reminder {
    title;
    eventSchedule;
    eventId;
    options;
    timeBefore;
    createdAt;
    reminderTime;
    jobId;
    type = BQType.REMINDERS;
    constructor(title, eventSchedule, eventId, options = { delay: 0, priority: 0, repeat: { every: 0 } }, timeBefore = { hours: 0, minutes: 30, days: 0 }) {
        this.title = title;
        this.eventSchedule = eventSchedule;
        this.eventId = eventId;
        this.options = options;
        this.timeBefore = timeBefore;
        this.eventId = eventId;
        this.title = title;
        this.eventSchedule = eventSchedule;
        this.createdAt = new Date();
        this.reminderTime = this.calculateReminderTime(this.eventSchedule);
        this.options = { ...options, delay: this.reminderTime.getTime() - new Date().getTime() };
    }
    calculateReminderTime(eventSchedule) {
        const reminderTime = new Date(eventSchedule);
        reminderTime.setHours(reminderTime.getHours() - this.timeBefore.hours ?? 0);
        reminderTime.setMinutes(reminderTime.getMinutes() - this.timeBefore.minutes ?? 30);
        reminderTime.setDate(reminderTime.getDate() - this.timeBefore.days ?? 0);
        reminderTime.setMinutes(reminderTime.getMinutes() - 30);
        return reminderTime;
    }
    calculateDelay() {
        return this.reminderTime.getTime() - new Date().getTime();
    }
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
const ReminderJobModel = mongoose.model('Reminder', reminderSchema);
export { ReminderJobModel, Reminder };
