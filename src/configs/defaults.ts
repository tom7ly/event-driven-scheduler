import {config} from 'dotenv';
config()

export const PORTS = {
    CONSUL: Number(process.env.PORTS_CONSUL) || 8500,
    REDIS: Number(process.env.PORTS_REDIS) || 6379,
    RABBITMQ: Number(process.env.PORTS_RABBITMQ) || 5672,
    MONGODB: Number(process.env.PORTS_MONGODB) || 27017,
    APP: Number(process.env.PORTS_APP) || 8000,
    EVENTS: Number(process.env.PORTS_EVENTS) || 8001,
    REMINDERS: Number(process.env.PORTS_REMINDERS) || 8002,
    LOGS: Number(process.env.PORTS_LOGS) || 8003,
    JOBS: Number(process.env.PORT_JOBS) || 8004,
}
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
}
export const URIS = {
    REDIS: HOSTS.REDIS,
    RABBITMQ: `amqp://${HOSTS.RABBITMQ}:${PORTS.RABBITMQ}`,
    MONGODB: `mongodb://${HOSTS.MONGODB}:${PORTS.MONGODB}`
}

export interface IService {
    host: string;
    port: number;
    proxyUrl: string;
    apiUrl: string;
}

export enum ServiceList {
    events = 'events',
    reminders = 'reminders',
    logs = 'logs',
    jobs = 'jobs',
}


function generateServices(keys: typeof ServiceList): { [key in ServiceList]?: IService } {
    const services: { [key in ServiceList]?: IService } = {};
    for (const key in keys) {
        const KEY: keyof typeof HOSTS = key.toUpperCase() as keyof typeof HOSTS;
        const serviceKey = key as ServiceList;
        services[serviceKey] = {
            host: HOSTS[KEY],
            port: PORTS[KEY],
            apiUrl: `http://${HOSTS[KEY]}:${PORTS[KEY]}/${serviceKey}`,
            proxyUrl: `http://${HOSTS.APP}:${PORTS.APP}/api/${serviceKey}`
        }
    }

    return services;
}

export const SERVICES = generateServices(ServiceList);