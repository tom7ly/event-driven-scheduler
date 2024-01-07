import { RMQService } from './src/services/RabbitMQ/RMQService';
import { RMQueue, RMQExchange, RMQKeys } from './src/services/RabbitMQ/consts';
// COMPONENTS TESTS
const rmqSvc = new RMQService(RMQueue.GATEWAY, RMQExchange.LOGS);
const eventCreatedTarget = {
    exchange: RMQExchange.EVENTS,
    key: RMQKeys.EVENTS.CREATED
};
const eventsDeletedTarget = {
    exchange: RMQExchange.EVENTS,
    key: RMQKeys.EVENTS.DELETED
};
const remindersCreatedTarget = {
    exchange: RMQExchange.REMINDERS,
    key: RMQKeys.REMINDERS.CREATED
};
const remindersDeletedTarget = {
    exchange: RMQExchange.REMINDERS,
    key: RMQKeys.REMINDERS.DELETED
};
const data2 = "asdjsdhfkajlsdhfkasjdhfklajhfdklsjahfasdf";
const main = async () => {
    await rmqSvc.connect();
    await rmqSvc.subscribe(eventCreatedTarget, (msg) => {
        rmqSvc.publish(remindersCreatedTarget.key, { data: "asfasf" });
    });
    await rmqSvc.subscribe(eventsDeletedTarget, (msg) => {
        console.log(msg);
    });
    await rmqSvc.subscribe(remindersCreatedTarget, (msg) => {
        console.log(msg);
        rmqSvc.publish(remindersDeletedTarget.key, { data: "asfasf" });
    });
    await rmqSvc.subscribe(remindersDeletedTarget, (msg) => {
        console.log(msg);
        rmqSvc.publish(eventsDeletedTarget.exchange, { data: "asfasf" });
    });
    await rmqSvc.publish(eventCreatedTarget.exchange, { data: "asfasf" });
};
main();
