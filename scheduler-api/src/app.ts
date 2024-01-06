// app.ts
import express from 'express';
import cors from 'cors';
import { eventsRouter } from './routes/events';
import { remindersRouter } from './routes/reminders';
import { arena } from './app.config';
import { APIErr } from 'scheduler-shared/utils/APIutils';
import { PORTS, URIS, HOSTS } from 'scheduler-shared/configs/defaults'
import { rabbitMQService } from './services/external-services';
import { initMongoDB } from 'scheduler-shared/services/MongoDB';

export const app = express();


const setupMiddleware = () => {
  app.use(express.json());
  app.use(cors());
  app.use(arena());

}
const setupServices = async () => {
  await rabbitMQService.connect()
  await initMongoDB(URIS.MONGODB);
}

const setupRoutes = () => {
  app.use('/api', eventsRouter);
  app.use('/api', remindersRouter)
}
async function startServer() {
  try {
    setupMiddleware();
    setupRoutes();
    await setupServices();
    app.listen(PORTS.APP, () => { console.log(`Server is running on port ${PORTS.APP}`); });
  }
  catch (err) {
    console.log(err);
  }
}

startServer();