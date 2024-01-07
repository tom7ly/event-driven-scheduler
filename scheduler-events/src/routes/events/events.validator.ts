import { RMQKeys } from 'scheduler-shared/services/RabbitMQ/consts';
import { rabbitMQService } from '../../services/external-services';
import { body, param, validationResult } from 'express-validator';

const isNotEmpty = field => body(field).notEmpty().withMessage(`${field} cannot be empty`);
const isOptionalArray = field => body(field).isArray().optional();
const isMongoId = field => param(field).isMongoId().withMessage(`${field} must be a valid Mongo ID`);

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        rabbitMQService.publish(RMQKeys.EVENTS.ERROR, { data: errors, message: "Invalid request body" });
        return res.status(400).json({ message: "Invalid request body", errors: errors.array() });
    }
    next();
};

export const validateBatchOperations = [
    isOptionalArray('create'),
    isOptionalArray('update'),
    isOptionalArray('deleteIds'),
    handleValidationErrors,
    (req, res, next) => {
        req.validatedData = {
            create: req.body.create || [],
            update: req.body.update || [],
            deleteIds: req.body.deleteIds || [],
        };
        next();
    },
];

export const validateScheduleEvent = [
    isNotEmpty('title'),
    isNotEmpty('description'),
    isNotEmpty('location'),
    isNotEmpty('venue'),
    isNotEmpty('eventSchedule.date'),
    isNotEmpty('eventSchedule.time'),
    handleValidationErrors,
    (req, res, next) => {
        req.validatedData = req.body;
        next();
    },
];

export const validateUpdateEvent = [
    isMongoId('eventId'),
    body('title').optional(),
    body('description').optional(),
    body('location').optional(),
    body('venue').optional(),
    body('eventSchedule.date').optional(),
    body('eventSchedule.time').optional(),
    handleValidationErrors,
    (req, res, next) => {
        req.validatedData = {
            eventId: req.params.eventId,
            data: req.body,
        };
        next();
    },
];

export const validateGetEventById = [
    isMongoId('eventId'),
    handleValidationErrors,
    (req, res, next) => {
        req.validatedData = { eventId: req.params.eventId };
        next();
    },
];

export const validateGetEvents = [
    (req, res, next) => {
        const { venue, location, sortBy } = req.query;
        if (venue && typeof venue !== 'string') {
            const error = 'Venue must be a string';
            rabbitMQService.publish(RMQKeys.EVENTS.ERROR, { message: error });
            return res.status(400).json({ error: error });
        }
        if (location && typeof location !== 'string') {
            const error = 'Location must be a string';
            rabbitMQService.publish(RMQKeys.EVENTS.ERROR, { message: error });
            return res.status(400).json({ error: error });
        }
        if (sortBy && !['popularity', 'date', 'creationTime'].includes(sortBy)) {
            const error = 'Invalid sort option. Allowed options are: popularity, date, creationTime';
            rabbitMQService.publish(RMQKeys.EVENTS.ERROR, { message: error });
            return res.status(400).json({ error: error });
        }
        req.validatedData = { venue, location, sortBy };
        next();
    }
];
