// app.ts
import express from 'express';
import cors from 'cors';
import { eventsRouter } from './routes/events/events';
import { PORTS, URIS } from 'scheduler-shared/configs/defaults'
import { initMongoDB } from 'scheduler-shared/services/MongoDB';
import { rabbitMQService, bullQService, restClient } from './services/external-services';
import { eventsService } from './services/events.service';

export const app = express();

const setupMiddleware = () => {
    app.use(express.json());
    app.use(cors());
}

const setupServices = async () => {
    await initMongoDB(URIS.MONGODB);
    await rabbitMQService.connect()
    await eventsService.initConsumers();
}

const setupRoutes = () => {
    app.use('/events', eventsRouter);
}

async function startServer() {
    try {
        setupMiddleware();
        setupRoutes();
        await setupServices();
        app.listen(PORTS.EVENTS, () => { console.log(`Server is running on port ${PORTS.EVENTS}`); });
    }
    catch (err) {
        console.log(err);
    }
}

startServer();