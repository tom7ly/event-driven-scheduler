import { restClient } from './external-services'
export const remindersService = {
    async getReminders() {
        return await restClient.gw.reminders.get('/');
    },
    async createReminder(reminder: any) {
        return await restClient.gw.reminders.post('/', reminder);
    },
    async cancelReminder(jobId: string) {
        return await restClient.gw.reminders.delete(`/${jobId}`);
    }
}