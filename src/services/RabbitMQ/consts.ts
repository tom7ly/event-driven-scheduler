export enum RMQueue {
    GATEWAY = 'gateway',
    REMINDERS = 'reminders',
    EVENTS = 'events',
    LOGS = 'logs',
    JOBS = 'jobs',
    SCHEDULER = 'scheduler',
    NOTIFICATIONS = 'notifications'
}

export const RMQKeys = {
    NOTIFICATIONS: 'notifications',
    REMINDERS: {
        ROOT: 'reminders',
        GET: 'reminders.get',
        CREATED: 'reminders.created',
        UPDATED: 'reminders.updated',
        DELETED: 'reminders.deleted',
        ERROR: 'reminders.error'
    },
    EVENTS: {
        ROOT: 'events',
        GET: 'events.get',
        CREATED: 'events.created',
        UPDATED: {
            SCHEDULE: 'events.updated.schedule',
        },
        DELETED: 'events.deleted',
        BATCH: 'events.batch',
        ERROR: 'events.error'
    },
} as const;


export enum RMQExchange {
    GATEWAY = 'gateway',
    REMINDERS = 'reminders',
    EVENTS = 'events',
    LOGS = 'logs',
    JOBS = 'jobs',
    SCHEDULER = 'scheduler',
    NOTIFICATIONS = 'notifications'
}