import express from 'express'
import { setupDatabase } from '@scheduler-shared/utils/initiators'
import { HOSTS, URIS, PORTS } from '@scheduler-shared/configs/defaults'
import cors from 'cors'
import { rabbitMQService } from './services/external-services'
import { remindersRouter } from './routes/reminders'
import { remindersService } from './services/reminders.service'
const appService = express()

const setupMiddleware = () => {
  appService.use(express.json());
  appService.use(cors());
}
const setupRoutes = () => {
  appService.use('/reminders', remindersRouter)
}
const setupServices = async () => {
  await rabbitMQService.connect();
  await remindersService.initConsumers();
}
async function startServer() {
  try {
    await setupDatabase(URIS.MONGODB);
    setupMiddleware();
    setupServices();
    setupRoutes();
    appService.listen(PORTS.REMINDERS, () => {
      console.log(`Server is running on port ${PORTS.REMINDERS}`);
    });
  }
  catch (err) {
    console.log(err);
  }
}

startServer();