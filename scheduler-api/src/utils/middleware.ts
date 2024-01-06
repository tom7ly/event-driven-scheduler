import { RMQKeys } from "@scheduler-shared/services/RabbitMQ/consts";
import { NextFunction, Request, Response } from "express";
import { rabbitMQService } from "src/services/external-services";

export async function publishRequestDetails(req: Request, response: Response, next: NextFunction) {
    try {
        // next()
        const { origin } = req.headers;
        const target = req.originalUrl;
        const method = req.method
        const data = {
            origin,
            target,
            method
        };
        await rabbitMQService.publish(RMQKeys.NOTIFICATIONS, { data, message: 'REQUEST LOG' });
        next();
    } catch (error) {
        console.error('Failed to publish request details:', error);
        next(error);
    }
}

