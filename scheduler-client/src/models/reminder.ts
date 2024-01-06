export interface IReminder {
    eventId?: string;
    jobId: string;
    title: string;
    eventSchedule: Date;
    reminderTime: Date;
    createdAt: Date;
}