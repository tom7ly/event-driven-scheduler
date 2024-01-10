import { IBullQService, initBullQService } from "scheduler-shared/dist/services/BullQService";
import { BQType } from "scheduler-shared/dist/models/BullQ.models";
import { IRESTClient, RESTProxyClient } from "scheduler-shared/dist/services/RESTClient";
import { HOSTS, PORTS, URIS } from "scheduler-shared/dist/configs/defaults";
import { Connection } from "mongoose";
import { RMQService } from "scheduler-shared/dist/services/RabbitMQ/RMQService";
import { RMQueue, RMQExchange } from "scheduler-shared/dist/services/RabbitMQ/consts";

export const rabbitMQService = new RMQService(RMQueue.EVENTS, RMQExchange.EVENTS);
export const bullQService = initBullQService(BQType.EVENTS);
export const restClient = new RESTProxyClient