import Bull from 'bull';
import { BQType } from '../models/BullQ.models';
import { APIErr } from '../utils/APIutils';
class BullQ {
    queueName;
    queue;
    constructor(queueName = BQType.DEFAULT) {
        this.queueName = queueName;
        this.queue = new Bull(queueName);
    }
    async addTask(data, options = { delay: 0 }) {
        if (options?.delay < 0 || !options?.delay) {
            throw new APIErr(400, "Invalid delay");
        }
        return await this.queue.add(data, options).then((job) => {
            console.log('Job added', job.id);
            return job;
        }).catch((err) => {
            console.log('Job add failed', err);
            throw err;
        });
    }
    async processTask(callback) {
        this.queue.process(async (job) => {
            const task = job.data;
            callback(task);
        });
    }
    async getJobs() {
        return await this.queue.getJobs(['waiting', 'active', 'delayed']);
    }
    async getJob(jobId) {
        return await this.queue.getJob(jobId);
    }
}
export const initBullQService = (queueName) => {
    return new BullQ(queueName);
};
