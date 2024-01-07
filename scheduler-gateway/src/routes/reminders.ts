
const express = require('express');
const router = express.Router();
import { restClient } from '../services/external-services';
import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { param, } from 'express-validator';

router.get('/reminders', async (req: Request, res: Response) => {
    try {
        const response = await restClient.services.reminders.get('/');
        res.status(200).send(response.data);
    } catch (err) {
        res.status(err.response?.status || 500).send(err.response?.data || 'Error fetching jobs');
    }
});
router.delete('/reminders/:jobId', async (req: Request, res: Response) => {
    try {
        const response = await restClient.services.reminders.delete(`/${req.params.jobId}`);
        res.status(200).send(response.data);
    } catch (err) {
        res.status(err.response?.status || 500).send(err.response?.data || 'Error fetching jobs');
    }
})
export const remindersRouter = router;