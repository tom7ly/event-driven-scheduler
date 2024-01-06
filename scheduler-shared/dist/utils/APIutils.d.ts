/**
 * [PATH] src/utils/custom-error.ts
 * This file contains the custom error classes and interfaces which are used throughout the application
 */
export declare enum APIStatus {
    OK = 200,
    PARTIAL_SUCCESS = 207,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}
export interface IAPIRes {
    status?: APIStatus;
    message?: string;
    data?: any;
    errors?: string[];
}
export declare class APIResBase implements IAPIRes {
    status?: number;
    data?: any;
    errors?: string[];
    constructor(status?: number, data?: any, errors?: string[]);
}
export declare class APIRes implements IAPIRes {
    status: number;
    data: any;
    errors?: string[];
    constructor(status: number, data?: any, errors?: string[]);
}
export declare class APIErr extends Error implements IAPIRes {
    status: APIStatus;
    data?: any;
    errors?: string[];
    constructor(status: number, message?: string, data?: any, errors?: string[]);
}
