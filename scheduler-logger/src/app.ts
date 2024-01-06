import { IRMQMessage, RMQService } from 'scheduler-shared/services/RabbitMQ/RMQService';
import { RMQueue, RMQExchange } from 'scheduler-shared/services/RabbitMQ/consts'
const rmqService: RMQService = new RMQService(RMQueue.LOGS, RMQExchange.LOGS);

const logger = async () => {
    await rmqService.connect();
    for (let exchange of Object.values(RMQExchange)) {
        await rmqService.subscribe({ exchange, key: '#' }, async (msg: IRMQMessage) => { console.log(msg) })
    }
}

logger();