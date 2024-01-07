export declare const PORTS: {
    CONSUL: number;
    REDIS: number;
    RABBITMQ: number;
    MONGODB: number;
    APP: number;
    EVENTS: number;
    REMINDERS: number;
    LOGS: number;
    JOBS: number;
};
export declare const HOSTS: {
    CONSUL: string;
    REDIS: string;
    RABBITMQ: string;
    MONGODB: string;
    APP: string;
    REMINDERS: string;
    EVENTS: string;
    LOGS: string;
    JOBS: string;
};
export declare const URIS: {
    REDIS: string;
    RABBITMQ: string;
    MONGODB: string;
};
export interface IService {
    host: string;
    port: number;
    proxyUrl: string;
    apiUrl: string;
}
export declare enum ServiceList {
    events = "events",
    reminders = "reminders",
    logs = "logs",
    jobs = "jobs"
}
export declare const SERVICES: {
    events?: IService;
    reminders?: IService;
    logs?: IService;
    jobs?: IService;
};
