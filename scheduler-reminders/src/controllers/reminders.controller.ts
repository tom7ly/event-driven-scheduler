import { bullQService, rabbitMQService, restClient } from '../services/external-services';
import { Job, JobOptions } from 'bull';
import { EventModel, IEvent } from '@scheduler-shared/models/Event.models';
import { IReminder, Reminder } from '@scheduler-shared/models/Reminder.models';
import { RMQKeys } from '@scheduler-shared/services/RabbitMQ/consts';

export const RemindersController = {
    getReminders: async () => {
        try {
            const jobs = await bullQService.getJobs<IReminder>()
            // rabbitMQService.publish(RMQKeys.REMINDERS.GET, { data: jobs });
            return jobs.map(({ data, id }) => ({ ...data, jobId: id }));
        } catch (error) {
            console.error('Failed to get reminders:', error);
            throw error;
        }
    },
    getEventReminders: async (eventId: string) => {
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
            // rabbitMQService.publish(RMQKeys.REMINDERS.GET, { data: reminders });
            return reminders;
        } catch (error) {
            console.error('Failed to get reminder:', error);
            throw error;
        }
    },
    deleteReminder: async (jobId: string) => {
        try {
            const reminder = await bullQService.getJob<IReminder>(jobId).then(async (job: Job<IReminder>) => {
                const reminder: IReminder = { ...job.data, jobId: jobId };
                await job.remove();
                return reminder
            })
            await rabbitMQService.publish(RMQKeys.REMINDERS.DELETED, { data: reminder });
        } catch (error) {
            console.error('Failed to delete reminder:', error);
            throw error;
        }
    }
}