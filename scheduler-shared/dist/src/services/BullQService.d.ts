import Bull, { Job, JobOptions } from 'bull';
import { BQType } from '../models/BullQ.models';
export interface IBullQService {
    addTask<T>(data: T, options: JobOptions): Promise<Job>;
    processTask(processor: (ITask: any) => any): Promise<void>;
    getJobs<T>(): Promise<Job<T>[]>;
    getJob<T>(jobId: Bull.JobId): Promise<Job<T>>;
}
export declare const initBullQService: (queueName: BQType) => IBullQService;
