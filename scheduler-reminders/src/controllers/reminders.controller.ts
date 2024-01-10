import { bullQService, rabbitMQService, restClient } from '../services/external-services';
import { Job, JobOptions } from 'bull';
import { EventModel, IEvent } from 'scheduler-shared/dist/models/Event.models'
import { IReminder, Reminder } from 'scheduler-shared/dist/models/Reminder.models';
import { RMQKeys } from 'scheduler-shared/dist/services/RabbitMQ/consts';

export class RemindersController {
    constructor() { }
    handleError(err: Error) {
        console.error(err);
        rabbitMQService.publish(RMQKeys.REMINDERS.ERROR, { message: err.message });
    }

    getReminders = async () => {
        try {
            const jobs = await bullQService.getJobs<IReminder>()
            return jobs.map(({ data, id }) => ({ ...data, jobId: id }));
        } catch (error) {
            this.handleError(error);
        }
    }
    getEventReminders = async (eventId: string) => {
        try {
            const event: IEvent = await restClient.gw.events.get<IEvent>(eventId).then(res => {
                if (res.data.jobs.length === 0) throw new Error('No reminders found for this event')
                return res.data
            }).catch(err => {
                throw err
            })
            const reminders: Job<IReminder>[] = await Promise.all(event.jobs.map(async (job: IReminder) => {
                return await bullQService.getJob<IReminder>(job.jobId);
            }));
            return reminders;
        } catch (error) {
            this.handleError(error);
        }
    }
    deleteReminder = async (jobId: number) => {
        try {
            return await bullQService.getJob<IReminder>(jobId).then(async (job: Job<IReminder>) => {
                const reminder: IReminder = { ...job.data, jobId: jobId };
                await job.remove();
                return reminder
            })
        } catch (error) {
            this.handleError(error);
        }
    }
}
export const remindersController = new RemindersController();