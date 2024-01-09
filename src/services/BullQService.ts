

import Queue, { Job, JobOptions } from 'bull';
import { IReminder } from '../models/Reminder.models';
import { BQType, IBQJob } from '../models/BullQ.models';
import { APIErr } from '../utils/APIutils';
import { HOSTS, PORTS, URIS } from 'src/configs/defaults';
import Bull from 'bull';


export interface IBullQService {
    queue: Bull.Queue;
    addTask<T>(data: T, options: JobOptions): Promise<Job>;
    processTask(processor: (ITask: any) => any): Promise<void>;
    getJobs<T>(): Promise<Job<T>[]>;
    getJob<T>(jobId: Bull.JobId): Promise<Job<T>>;
    clearQueue(): Promise<void>;
}

class BullQ implements IBullQService {
    public queue: Bull.Queue;
    constructor(private queueName: BQType = BQType.DEFAULT) {
        this.queue = new Queue(queueName, {
            redis: {
                port: PORTS.REDIS,
                host: HOSTS.REDIS,
            }
        })
        this.queue.client.on('connect', () => {
            console.log('Connected to redis');
        })
    }
    public clearQueue(): Promise<void> {
        return this.queue.empty();
    }
    public async addTask<T>(data: T, options: JobOptions = { delay: 0 }): Promise<Job> {
        if (options?.delay < 0 || !options?.delay) {
            throw new APIErr(400, "Invalid delay");
        }
        return await this.queue.add(data, options).then((job: Job) => {
            console.log('Job added', job.id);
            return job;
        }).catch((err) => {
            console.log('Job add failed', err);
            throw err;
        });
    }
    public async processTask(callback: (ITask: any) => any): Promise<void> {
        this.queue.process(async (job: Job) => {
            const task: IBQJob = job.data;
            callback(task);
        });
    }
    public async getJobs<T>(): Promise<Job<T>[]> {
        return await this.queue.getJobs(['waiting', 'active', 'delayed']);
    }
    public async getJob<T>(jobId: string): Promise<Job<T>> {
        return await this.queue.getJob(jobId);
    }
}
export const initBullQService: (queueName: BQType) => IBullQService = (queueName: BQType) => {
    return new BullQ(queueName);
}