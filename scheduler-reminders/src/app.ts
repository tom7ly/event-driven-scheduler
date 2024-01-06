import cors from 'cors'
import express from 'express'
import { setupDatabase } from 'scheduler-shared/src/utils/initiators'
import { HOSTS, URIS, PORTS } from 'scheduler-shared/src/configs/defaults'
import { rabbitMQService } from './services/external-services'
import { remindersRouter } from './routes/reminders'
import { remindersService } from './services/reminders.service'
import {config} from 'dotenv'
config()

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