import { PORTS, URIS } from "@scheduler-shared/configs/defaults"
import { BQType } from "@scheduler-shared/models/BullQ.models"
import { IBullQService, initBullQService } from "@scheduler-shared/services/BullQService"
import { RESTProxyClient, IRESTClient } from "@scheduler-shared/services/RESTClient"
import { AxiosInstance } from "axios"
import { RMQService } from "@scheduler-shared/services/RabbitMQ/RMQService"
import { RMQueue, RMQExchange } from "@scheduler-shared/services/RabbitMQ/consts"

export const rabbitMQService = new RMQService(RMQueue.REMINDERS, RMQExchange.REMINDERS)
export const bullQService: IBullQService = initBullQService(BQType.REMINDERS)
export const restClient: RESTProxyClient = new RESTProxyClient()