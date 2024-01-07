import { bullQService, rabbitMQService } from "./external-services";
import { Job, JobOptions } from "bull";
import { IBullQService } from "scheduler-shared/services/BullQService";
import { IEvent } from "scheduler-shared/models/Event.models";
import { IReminder, Reminder, ReminderJobModel } from "scheduler-shared/models/Reminder.models";
import { APIErr } from "scheduler-shared/utils/APIutils";
import { RMQKeys, RMQExchange } from "scheduler-shared/services/RabbitMQ/consts";
import { IRMQMessage } from "scheduler-shared/services/RabbitMQ/RMQService";


class RemindersService {
    constructor() {
    }
    private handleError(err: Error) {
        console.error(err);
        rabbitMQService.publish(RMQKeys.REMINDERS.ERROR, { message: err.message });
        // if (err instanceof APIErr) {
        //     throw err;
        // }
        // throw new APIErr(500, 'Internal Server Error');
    }
    async initConsumers() {
        await bullQService.processTask((task) => {
            const reminder: IReminder = task.data;
            console.log(`Reminder: ${reminder.title} is due now`);
        });
        await rabbitMQService.subscribe({ exchange: RMQExchange.EVENTS, key: RMQKeys.EVENTS.CREATED }, this.onEventCreated.bind(this))
        await rabbitMQService.subscribe({ exchange: RMQExchange.EVENTS, key: RMQKeys.EVENTS.DELETED }, this.onEventDeleted.bind(this))
    }
    
    async onEventDeleted(message: IRMQMessage<IEvent>) {
        try {
            const event: IEvent = message.data
            await Promise.all(event.jobs.map(async (reminder: IReminder) => {
                await bullQService.getJob<IReminder>(reminder.jobId).then(async (job: Job<IReminder>) => {
                    await job.remove();
                    await ReminderJobModel.findByIdAndDelete(reminder._id);
                })
            }))
        } catch (error) {
            this.handleError(error);
        }
    }
    async onEventCreated(message: IRMQMessage<IEvent>) {
        try {
            const event: IEvent = message.data
            const reminder: IReminder = await this.createReminderFromEvent(event);
            await rabbitMQService.publish(RMQKeys.REMINDERS.CREATED, { data: reminder, message: "Reminder created" });
        } catch (error) {
            this.handleError(error);
        }
    }
    async createReminderFromEvent(event: IEvent): Promise<IReminder> {
        try {
            const reminder: Reminder = new Reminder(event.title, event.eventSchedule, event._id);
            const job: Job<IReminder> = await bullQService.addTask<IReminder>(reminder, { delay: reminder.calculateDelay() });
            reminder.jobId = job.id;
            return reminder;
        } catch (error) {
            this.handleError(error);
        }
    }
}

export const remindersService = new RemindersService();