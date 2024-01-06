import { initBullQService } from "scheduler-shared/services/BullQService";
import { BQType } from "scheduler-shared/models/BullQ.models";
import { RESTApiClient } from "scheduler-shared/services/RESTClient";
import { RMQService } from "scheduler-shared/services/RabbitMQ/RMQService";
import { RMQExchange, RMQueue } from "scheduler-shared/services/RabbitMQ/consts";

export const rabbitMQService = new RMQService(RMQueue.GATEWAY, RMQExchange.GATEWAY);
export const bullQService = initBullQService(BQType.GATEWAY);
export const restClient: RESTApiClient = new RESTApiClient()