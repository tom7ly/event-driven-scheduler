
import { eventsController } from '../../controllers/events-controller'
import express from 'express';
import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import { param, } from 'express-validator';
import { validateBatchOperations, validateGetEventById, validateGetEvents, validateScheduleEvent, validateUpdateEvent } from './events.validator';
import { APIStatus, IAPIRes } from 'scheduler-shared/utils/APIutils';
import { IEvent } from 'scheduler-shared/models/Event.models';

/**
 * [PATH] src/routes/events.ts
 * This file contains the routes for the events API.
 */

const router = express.Router();
router.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per windowMs
  })
);
router.post('/', validateScheduleEvent, async (req, res: Response) => {
  try {
    const eventData: IEvent = req.validatedData;
    const result:IEvent = await eventsController.scheduleEvent(eventData);
    res.status(APIStatus.OK).json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }

})
router.get('/', validateGetEvents, async (req, res) => {
  try {
    const result = await eventsController.getEvents(req.validatedData);
    res.status(APIStatus.OK).json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

router.post('/batch', validateBatchOperations, async (req, res) => {
  try {
    const result: IAPIRes = await eventsController.batchOperations(req.validatedData);
    res.status(APIStatus.OK).json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

router.get('/:eventId', validateGetEventById, async (req, res) => {
  try {
    const result = await eventsController.getEventById(req.validatedData.eventId);
    res.status(APIStatus.OK).json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

router.put('/:eventId', validateUpdateEvent, async (req, res) => {
  try {
    const result = await eventsController.updateEvent(req.validatedData.eventId, req.validatedData.data);
    res.status(APIStatus.OK).json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

router.delete('/:eventId', param('eventId').isMongoId(), async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const result = await eventsController.deleteEvent(eventId);
    res.status(APIStatus.OK).json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

export const eventsRouter = router;