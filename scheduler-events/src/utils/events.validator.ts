import { RMQKeys } from 'scheduler-shared/dist/services/RabbitMQ/consts';
import { rabbitMQService } from '../services/external-services';
import { body, param, validationResult } from 'express-validator';
import { NextFunction, Request, Response, } from 'express';

export const validators = {
    isNotEmpty: (field: any) => body(field).notEmpty().withMessage(`${field} cannot be empty`),
    isOptionalArray: (field: any) => body(field).isArray().optional(),
    isMongoId: (field: any) => body(field).notEmpty().withMessage(`${field} must be a valid Mongo ID`),
    isValidDate: (field: any) => body(field)
        .custom((value, { req }) => {
            const date = Date.parse(value);
            if (isNaN(date)) {
                throw new Error(`${field} must be a valid date`);
            }
            if (new Date(value) <= new Date()) {
                throw new Error(`${field} must be a future date`);
            }
            return true;
        })
}


const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        rabbitMQService.publish(RMQKeys.EVENTS.ERROR, { data: errors, message: "Invalid request body" });
        return res.status(400).json({ message: "Invalid request body", errors: errors.array() });
    }
    next();
};

export const validateBatchOperations = [
    validators.isOptionalArray('create'),
    validators.isOptionalArray('update'),
    validators.isOptionalArray('deleteIds'),
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
    validators.isNotEmpty('title'),
    validators.isNotEmpty('description'),
    validators.isNotEmpty('location'),
    validators.isNotEmpty('venue'),
    validators.isValidDate('eventSchedule'),
    handleValidationErrors,
    (req, res, next) => {
        req.validatedData = req.body;
        next();
    },
];

export const validateUpdateEvent = [
    validators.isMongoId('_id'),
    body('title').optional(),
    body('description').optional(),
    body('location').optional(),
    body('venue').optional(),
    validators.isValidDate('eventSchedule').optional(),
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
    validators.isMongoId('eventId'),
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
