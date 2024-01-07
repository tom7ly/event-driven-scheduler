/**
 * [PATH] src/utils/custom-error.ts
 * This file contains the custom error classes and interfaces which are used throughout the application
 */
export var APIStatus;
(function (APIStatus) {
    APIStatus[APIStatus["OK"] = 200] = "OK";
    APIStatus[APIStatus["PARTIAL_SUCCESS"] = 207] = "PARTIAL_SUCCESS";
    APIStatus[APIStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    APIStatus[APIStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    APIStatus[APIStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    APIStatus[APIStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    APIStatus[APIStatus["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(APIStatus || (APIStatus = {}));
export class APIResBase {
    status;
    data;
    errors;
    constructor(status, data, errors) {
        this.status = status;
        this.data = data;
        this.errors = errors;
    }
}
export class APIRes {
    status;
    data;
    errors;
    constructor(status, data, errors) {
        this.status = status;
        this.data = data ? data : {};
        this.errors = errors;
    }
}
export class APIErr extends Error {
    status;
    data;
    errors;
    constructor(status, message = '', data, errors) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = 'APIErr';
        this.status = status;
        this.message = message;
        this.data = data;
        this.errors = errors;
    }
}
