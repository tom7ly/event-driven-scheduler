import { Channel, Connection, ConsumeMessage, connect, Message, MessageFields, MessageProperties, ConsumeMessageFields } from "amqplib";
import { APIErr } from "../../utils/APIutils";
import { URIS } from "../../configs/defaults";
import { IReminder } from "../../models/Reminder.models";
import { IEvent } from "../../models/Event.models";
import { generateUID } from "../../utils/helpers";
import { RMQExchange, RMQueue } from "./consts";


export interface IRMQTarget {
    exchange: RMQExchange,
    key: string
}
export interface IRMQOptions {
    retry?: {
        retryDelay?: number,
        maxRetryAttempts: number
    }
}
export interface IRMQMessage<T = any> {
    service?: string;
    createdAt?: Date;
    data?: T;
    routingKey: string;
    message?: string;
    exchange?: RMQExchange
}



export class RMQMessage<T = any> implements IRMQMessage<T> {
    readonly data: T;
    readonly service?: string;
    readonly createdAt?: Date;
    readonly routingKey: string;

    readonly message?: string;
    exchange: RMQExchange;
    constructor(message: IRMQMessage<T>) {
        this.service = message.service || process.env.SERVICE_NAME;
        this.createdAt = message.createdAt || new Date();
        this.data = message.data;
        this.routingKey = message.routingKey;
        this.message = message.message;
    }

    toString(): string {
        return JSON.stringify(this);
    }
}

// export interface IRMQService {
//     connect(): Promise<void>;
//     disconnect(): Promise<void>;
//     consume<T>(target: IRMQTarget, callback: (msg: RMQMessage<T>) => Promise<void>, options?: IRMQOptions, noack?: boolean): Promise<void>;
//     publish<T>(target: IRMQTarget, message: IRMQMessage<T>): Promise<boolean>
//     addTarget(target: IRMQTarget): Promise<IRMQTarget>;
// }


export type RMQHandler<T = any> = (msg: IRMQMessage<T>) => void;



export class RMQService {
    private connection: Connection | null = null;
    private channel: Channel | null = null;
    private handlers: Map<string, RMQHandler> = new Map();
    constructor(public name: RMQueue | string, public exchange: RMQExchange) {
        this.name = name + generateUID();
    }
    async connect(url: string = URIS.RABBITMQ): Promise<void> {
        this.connection = await connect(url);
        this.channel = await this.connection.createChannel();
    }

    registerHandler<T>(key: string, handler: RMQHandler<T>): void {
        this.handlers.set(key, handler);
    }

    getHandler<T>(key: string): RMQHandler<T> | undefined {
        return this.handlers.get(key);
    }

    async publish<T>(routingKey: string, data: any): Promise<void> {
        const message = new RMQMessage<T>({...data,routingKey: routingKey})
        const payload = JSON.stringify(message);
        if (!this.channel) {
            throw new Error('Cannot publish message, channel is not initialized');
        }
        await this.channel.assertExchange(this.exchange, "topic", { durable: false });
        this.channel.publish(this.exchange, routingKey, Buffer.from(payload));
    }

    async subscribe<T>(target: IRMQTarget, handler: RMQHandler<T>): Promise<void> {
        if (!this.channel) {
            throw new Error('Cannot subscribe, channel is not initialized');
        }
        await this.channel.assertExchange(target.exchange, "topic", { durable: false });
        const assertQueue = await this.channel.assertQueue(this.name, { exclusive: true });
        await this.channel.bindQueue(assertQueue.queue, target.exchange, target.key);
        this.channel.consume(assertQueue.queue, (msg) => {
            const data = JSON.parse(msg.content.toString());
            const message: IRMQMessage<T> = new RMQMessage<T>(data);
            handler(message);
            this.channel?.ack(msg);
        });
    }

    async close(): Promise<void> {
        if (this.connection) {
            await this.connection.close();
        }
    }
}













