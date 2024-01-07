export var RMQueue;
(function (RMQueue) {
    RMQueue["GATEWAY"] = "gateway";
    RMQueue["REMINDERS"] = "reminders";
    RMQueue["EVENTS"] = "events";
    RMQueue["LOGS"] = "logs";
    RMQueue["JOBS"] = "jobs";
    RMQueue["SCHEDULER"] = "scheduler";
    RMQueue["NOTIFICATIONS"] = "notifications";
})(RMQueue || (RMQueue = {}));
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
        UPDATED: 'events.updated',
        DELETED: 'events.deleted',
        BATCH: 'events.batch',
        ERROR: 'events.error'
    },
};
export var RMQExchange;
(function (RMQExchange) {
    RMQExchange["GATEWAY"] = "gateway";
    RMQExchange["REMINDERS"] = "reminders";
    RMQExchange["EVENTS"] = "events";
    RMQExchange["LOGS"] = "logs";
    RMQExchange["JOBS"] = "jobs";
    RMQExchange["SCHEDULER"] = "scheduler";
    RMQExchange["NOTIFICATIONS"] = "notifications";
})(RMQExchange || (RMQExchange = {}));
