import { PORTS, URIS } from "scheduler-shared/src/configs/defaults"
import { BQType } from "scheduler-shared/src/models/BullQ.models"
import { IBullQService, initBullQService } from "scheduler-shared/src/services/BullQService"
import { RESTProxyClient, IRESTClient } from "scheduler-shared/src/services/RESTClient"
import { AxiosInstance } from "axios"
import { RMQService } from "scheduler-shared/src/services/RabbitMQ/RMQService"
import { RMQueue, RMQExchange } from "scheduler-shared/src/services/RabbitMQ/consts"

export const rabbitMQService = new RMQService(RMQueue.REMINDERS, RMQExchange.REMINDERS)
export const bullQService: IBullQService = initBullQService(BQType.REMINDERS)
export const restClient: RESTProxyClient = new RESTProxyClient()