import { IEvent } from "./src/models/Event.models";
import { RESTClient, RESTProxyClient } from './src/services/RESTClient';
import { HOSTS } from './src/configs/defaults';
import { initBullQService } from './src/services/BullQService';
import { BQType, IBQJob } from './src/models/BullQ.models';
import { IReminder, Reminder } from './src/models/Reminder.models';
import { RMQService, IRMQTarget } from './src/services/RabbitMQ/RMQService';
import { RMQueue, RMQExchange, RMQKeys } from './src/services/RabbitMQ/consts';


// COMPONENTS TESTS

const rmqSvc: RMQService = new RMQService(RMQueue.GATEWAY, RMQExchange.LOGS);
const eventCreatedTarget: IRMQTarget = {
    exchange: RMQExchange.EVENTS,
    key: RMQKeys.EVENTS.CREATED
}
const eventsDeletedTarget: IRMQTarget = {
    exchange: RMQExchange.EVENTS,
    key: RMQKeys.EVENTS.DELETED
}
const remindersCreatedTarget: IRMQTarget = {
    exchange: RMQExchange.REMINDERS,
    key: RMQKeys.REMINDERS.CREATED
}
const remindersDeletedTarget: IRMQTarget = {
    exchange: RMQExchange.REMINDERS,
    key: RMQKeys.REMINDERS.DELETED
}

const data2 = "asdjsdhfkajlsdhfkasjdhfklajhfdklsjahfasdf"
const main = async () => {
    await rmqSvc.connect();
    await rmqSvc.subscribe(eventCreatedTarget, (msg) => {
        rmqSvc.publish(remindersCreatedTarget.key, { data: "asfasf" })
    })

    await rmqSvc.subscribe(eventsDeletedTarget, (msg) => {
        console.log(msg)
    })
    await rmqSvc.subscribe(remindersCreatedTarget, (msg) => {
        console.log(msg)
        rmqSvc.publish(remindersDeletedTarget.key, { data: "asfasf" })
    })
    await rmqSvc.subscribe(remindersDeletedTarget, (msg) => {
        console.log(msg)
        rmqSvc.publish(eventsDeletedTarget.exchange, { data: "asfasf" })
    })
    await rmqSvc.publish(eventCreatedTarget.exchange, { data: "asfasf" })
}


main()
