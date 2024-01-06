import { IBullQService, initBullQService } from "scheduler-shared/services/BullQService";
import { BQType } from "scheduler-shared/models/BullQ.models";
import { IRESTClient, RESTProxyClient } from "scheduler-shared/services/RESTClient";
import { HOSTS, PORTS, URIS } from "scheduler-shared/configs/defaults";
import { Connection } from "mongoose";
import { RMQService } from "scheduler-shared/services/RabbitMQ/RMQService";
import { RMQueue, RMQExchange } from "scheduler-shared/services/RabbitMQ/consts";

export const rabbitMQService = new RMQService(RMQueue.EVENTS, RMQExchange.EVENTS);
export const bullQService = initBullQService(BQType.EVENTS);
export const restClient = new RESTProxyClient