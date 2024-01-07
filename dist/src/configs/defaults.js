export const PORTS = {
    CONSUL: Number(process.env.PORT_CONSUL) || 8500,
    REDIS: Number(process.env.PORT_REDIS) || 6379,
    RABBITMQ: Number(process.env.PORT_RABBITMQ) || 5672,
    MONGODB: Number(process.env.PORT_MONGODB) || 27017,
    APP: Number(process.env.PORT_APP) || 8000,
    EVENTS: Number(process.env.PORT_EVENTS) || 8001,
    REMINDERS: Number(process.env.PORT_REMINDERS) || 8002,
    LOGS: Number(process.env.PORT_LOGS) || 8003,
    JOBS: Number(process.env.PORT_JOBS) || 8004,
};
export const HOSTS = {
    CONSUL: process.env.HOST_CONSUL || 'localhost',
    REDIS: process.env.HOST_REDIS || 'localhost',
    RABBITMQ: process.env.HOST_RABBITMQ || 'localhost',
    MONGODB: process.env.HOST_MONGO || 'localhost',
    APP: process.env.HOST_APP || 'localhost',
    REMINDERS: process.env.HOST_REMINDERS || 'localhost',
    EVENTS: process.env.HOST_EVENTS || 'localhost',
    LOGS: process.env.HOST_LOGS || 'localhost',
    JOBS: process.env.HOST_JOBS || 'localhost',
};
export const URIS = {
    REDIS: HOSTS.REDIS,
    RABBITMQ: `amqp://${HOSTS.RABBITMQ}:${PORTS.RABBITMQ}`,
    MONGODB: `mongodb://${HOSTS.MONGODB}:${PORTS.MONGODB}`
};
export var ServiceList;
(function (ServiceList) {
    ServiceList["events"] = "events";
    ServiceList["reminders"] = "reminders";
    ServiceList["logs"] = "logs";
    ServiceList["jobs"] = "jobs";
})(ServiceList || (ServiceList = {}));
function generateServices(keys) {
    const services = {};
    for (const key in keys) {
        const KEY = key.toUpperCase();
        const serviceKey = key;
        services[serviceKey] = {
            host: HOSTS[KEY],
            port: PORTS[KEY],
            apiUrl: `http://${HOSTS[KEY]}:${PORTS[KEY]}/${serviceKey}`,
            proxyUrl: `http://${HOSTS.APP}:${PORTS.APP}/api/${serviceKey}`
        };
    }
    return services;
}
export const SERVICES = generateServices(ServiceList);
