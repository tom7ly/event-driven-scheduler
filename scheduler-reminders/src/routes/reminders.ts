
import express from 'express';
import { Request, Response } from 'express';
import { APIStatus, IAPIRes } from 'scheduler-shared/src/utils/APIutils'
import { RemindersController } from '../controllers/reminders.controller';


const router = express.Router();

router.get('/', async (req, res: Response) => {
    try {
        const result = await RemindersController.getReminders();
        res.status(APIStatus.OK).json(result);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
})
router.delete('/:jobId', async (req, res: Response) => {
    try {
        const jobId = req.params.jobId;
        const result = await RemindersController.deleteReminder(jobId);
        res.status(APIStatus.OK).json(result);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
})
export const remindersRouter = router;