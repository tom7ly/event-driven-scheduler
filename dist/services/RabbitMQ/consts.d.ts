export declare enum RMQueue {
    GATEWAY = "gateway",
    REMINDERS = "reminders",
    EVENTS = "events",
    LOGS = "logs",
    JOBS = "jobs",
    SCHEDULER = "scheduler",
    NOTIFICATIONS = "notifications"
}
export declare const RMQKeys: {
    readonly NOTIFICATIONS: "notifications";
    readonly REMINDERS: {
        readonly ROOT: "reminders";
        readonly GET: "reminders.get";
        readonly CREATED: "reminders.created";
        readonly UPDATED: "reminders.updated";
        readonly DELETED: "reminders.deleted";
        readonly ERROR: "reminders.error";
    };
    readonly EVENTS: {
        readonly ROOT: "events";
        readonly GET: "events.get";
        readonly CREATED: "events.created";
        readonly UPDATED: "events.updated";
        readonly DELETED: "events.deleted";
        readonly BATCH: "events.batch";
        readonly ERROR: "events.error";
    };
};
export declare enum RMQExchange {
    GATEWAY = "gateway",
    REMINDERS = "reminders",
    EVENTS = "events",
    LOGS = "logs",
    JOBS = "jobs",
    SCHEDULER = "scheduler",
    NOTIFICATIONS = "notifications"
}
