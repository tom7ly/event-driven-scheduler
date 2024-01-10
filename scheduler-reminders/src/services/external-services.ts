import { PORTS, URIS } from "scheduler-shared/dist/configs/defaults"
import { BQType } from "scheduler-shared/dist/models/BullQ.models"
import { IBullQService, initBullQService } from "scheduler-shared/dist/services/BullQService"
import { RESTProxyClient, IRESTClient } from "scheduler-shared/dist/services/RESTClient"
import { AxiosInstance } from "axios"
import { RMQService } from "scheduler-shared/dist/services/RabbitMQ/RMQService"
import { RMQueue, RMQExchange } from "scheduler-shared/dist/services/RabbitMQ/consts"

export const rabbitMQService = new RMQService(RMQueue.REMINDERS, RMQExchange.REMINDERS)
export const bullQService: IBullQService = initBullQService(BQType.REMINDERS)
export const restClient: RESTProxyClient = new RESTProxyClient()