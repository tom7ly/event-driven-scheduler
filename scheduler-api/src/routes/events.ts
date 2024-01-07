
import express from 'express';
import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import { APIStatus } from 'scheduler-shared/utils/APIutils';
import { restClient } from '../services/external-services';
import { publishRequestDetails } from '../utils/middleware';
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

router.post('/events',publishRequestDetails, async (req: Request, res: Response) => {
  try {
    const result = await restClient.services.events.post('/', req.body);
    return res.status(APIStatus.OK).json(result.data);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
})

router.get('/events', publishRequestDetails, async (req, res) => {
  try {
    const result = await restClient.services.events.get('/', req.query);
    res.status(APIStatus.OK).json(result.data);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

router.post('/events/batch', async (req: Request, res: Response) => {
  try {
    const result = await restClient.services.events.post('/batch', req.body);
    res.status(APIStatus.OK).json(result.data);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

router.get('/events/:eventId',publishRequestDetails, async (req: Request, res: Response) => {
  try {
    const result = await restClient.services.events.get(`/${req.params.eventId}`);
    res.status(APIStatus.OK).json(result.data);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

router.put('/events/:eventId',publishRequestDetails, async (req: Request, res: Response) => {
  try {
    const result = await restClient.services.events.put(`/${req.params.eventId}`, req.body);
    res.status(APIStatus.OK).json(result.data);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

router.delete('/events/:eventId',publishRequestDetails, async (req: Request, res: Response) => {
  try {
    const result = await restClient.services.events.delete(`/${req.params.eventId}`);
    res.status(APIStatus.OK).json(result.data);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});



export const eventsRouter = router;