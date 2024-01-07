import { connect } from "amqplib";
import { URIS } from "../../configs/defaults";
import { generateUID } from "../../utils/helpers";
export class RMQMessage {
    data;
    service;
    createdAt;
    routingKey;
    message;
    exchange;
    constructor(message) {
        this.service = message.service || process.env.SERVICE_NAME;
        this.createdAt = message.createdAt || new Date();
        this.data = message.data;
        this.routingKey = message.routingKey;
        this.message = message.message;
    }
    toString() {
        return JSON.stringify(this);
    }
}
export class RMQService {
    name;
    exchange;
    connection = null;
    channel = null;
    handlers = new Map();
    constructor(name, exchange) {
        this.name = name;
        this.exchange = exchange;
        this.name = name + generateUID();
    }
    async connect(url = URIS.RABBITMQ) {
        this.connection = await connect(url);
        this.channel = await this.connection.createChannel();
    }
    registerHandler(key, handler) {
        this.handlers.set(key, handler);
    }
    getHandler(key) {
        return this.handlers.get(key);
    }
    async publish(routingKey, data) {
        const message = new RMQMessage({ ...data, routingKey: routingKey });
        const payload = JSON.stringify(message);
        if (!this.channel) {
            throw new Error('Cannot publish message, channel is not initialized');
        }
        await this.channel.assertExchange(this.exchange, "topic", { durable: false });
        this.channel.publish(this.exchange, routingKey, Buffer.from(payload));
    }
    async subscribe(target, handler) {
        if (!this.channel) {
            throw new Error('Cannot subscribe, channel is not initialized');
        }
        await this.channel.assertExchange(target.exchange, "topic", { durable: false });
        const assertQueue = await this.channel.assertQueue(this.name, { exclusive: true });
        await this.channel.bindQueue(assertQueue.queue, target.exchange, target.key);
        this.channel.consume(assertQueue.queue, (msg) => {
            const data = JSON.parse(msg.content.toString());
            const message = new RMQMessage(data);
            handler(message);
            this.channel?.ack(msg);
        });
    }
    async close() {
        if (this.connection) {
            await this.connection.close();
        }
    }
}
