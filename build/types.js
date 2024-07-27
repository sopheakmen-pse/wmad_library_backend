"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidMemberData = exports.parseDate = exports.CustomError = void 0;
const date_fns_1 = require("date-fns");
class CustomError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
const parseDate = (dateStr) => {
    const parsedDate = (0, date_fns_1.parse)(dateStr, "yyyy-MM-dd", new Date());
    return (0, date_fns_1.isValid)(parsedDate) ? parsedDate : undefined;
};
exports.parseDate = parseDate;
const isValidMemberData = (data) => {
    return (typeof data.fullname === "string" &&
        data.date_of_birth !== undefined &&
        typeof data.address === "string" &&
        typeof data.phone_number === "string" &&
        typeof data.email === "string" &&
        data.start_date !== undefined &&
        data.expiry_date !== undefined &&
        typeof data.is_active === "boolean");
};
exports.isValidMemberData = isValidMemberData;
