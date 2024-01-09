import { IEvent } from "./models/Event.models";
import { RESTClient, RESTProxyClient } from './services/RESTClient';
import { HOSTS } from './configs/defaults';
import { IBullQService, initBullQService } from './services/BullQService';
import { BQType, IBQJob } from './models/BullQ.models';
import { IReminder, Reminder } from './models/Reminder.models';
import { RMQService, IRMQTarget } from './services/RabbitMQ/RMQService';
import { RMQueue, RMQExchange, RMQKeys } from './services/RabbitMQ/consts';


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
const a = initBullQService(BQType.DEFAULT);

// const restclient = new RESTProxyClient()
// const a = restclient.gw.events.post('/', {
//     title: "asfdasd",
//     description: "fasdfasdf",
//     eventSchedule: "2024-02-08T12:22",
//     location: "Berlin",
//     venue: "Berghain",
//     participants: "12",
//   }).then((res) => { }).catch((err) => { 
//     console.log(err) })
// main()
