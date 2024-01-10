import { initBullQService } from "scheduler-shared/dist/services/BullQService";
import { BQType } from "scheduler-shared/dist/models/BullQ.models";
import { RESTApiClient } from "scheduler-shared/dist/services/RESTClient";
import { RMQService } from "scheduler-shared/dist/services/RabbitMQ/RMQService";
import { RMQExchange, RMQueue } from "scheduler-shared/dist/services/RabbitMQ/consts";

export const rabbitMQService = new RMQService(RMQueue.GATEWAY, RMQExchange.GATEWAY);
export const bullQService = initBullQService(BQType.GATEWAY);
export const restClient: RESTApiClient = new RESTApiClient()