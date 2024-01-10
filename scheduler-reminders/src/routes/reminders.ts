
import express from 'express';
import { Request, Response } from 'express';
import { APIStatus, IAPIRes } from 'scheduler-shared/dist/utils/APIutils'
import { remindersController } from '../controllers/reminders.controller';
import { RMQKeys } from 'scheduler-shared/dist/services/RabbitMQ/consts';
import { rabbitMQService } from 'src/services/external-services';


const router = express.Router();

router.get('/', async (req, res: Response) => {
    try {
        const result = await remindersController.getReminders();
        res.status(APIStatus.OK).json(result);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
})
router.delete('/:jobId', async (req, res: Response) => {
    try {
        const jobId = req.params.jobId;
        const result = await remindersController.deleteReminder(Number(jobId));
        await rabbitMQService.publish(RMQKeys.REMINDERS.DELETED, { data: result });
        res.status(APIStatus.OK).json(result);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
})
export const remindersRouter = router;