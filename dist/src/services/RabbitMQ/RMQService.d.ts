import { RMQExchange, RMQueue } from "./consts";
export interface IRMQTarget {
    exchange: RMQExchange;
    key: string;
}
export interface IRMQOptions {
    retry?: {
        retryDelay?: number;
        maxRetryAttempts: number;
    };
}
export interface IRMQMessage<T = any> {
    service?: string;
    createdAt?: Date;
    data?: T;
    routingKey: string;
    message?: string;
    exchange?: RMQExchange;
}
export declare class RMQMessage<T = any> implements IRMQMessage<T> {
    readonly data: T;
    readonly service?: string;
    readonly createdAt?: Date;
    readonly routingKey: string;
    readonly message?: string;
    exchange: RMQExchange;
    constructor(message: IRMQMessage<T>);
    toString(): string;
}
export type RMQHandler<T = any> = (msg: IRMQMessage<T>) => void;
export declare class RMQService {
    name: RMQueue | string;
    exchange: RMQExchange;
    private connection;
    private channel;
    private handlers;
    constructor(name: RMQueue | string, exchange: RMQExchange);
    connect(url?: string): Promise<void>;
    registerHandler<T>(key: string, handler: RMQHandler<T>): void;
    getHandler<T>(key: string): RMQHandler<T> | undefined;
    publish<T>(routingKey: string, data: any): Promise<void>;
    subscribe<T>(target: IRMQTarget, handler: RMQHandler<T>): Promise<void>;
    close(): Promise<void>;
}
