"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const handleCastError_1 = require("../helpers/handleCastError");
const handlerZodError_1 = require("../helpers/handlerZodError");
const handlerValidationError_1 = require("../helpers/handlerValidationError");
const handlerDuplicateError_1 = require("../helpers/handlerDuplicateError");
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const globalErrorHandler = (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    var _a, _b, _c, _d, _e;
    let errorSources = [];
    let statusCode = 500;
    let message = "Something went wrong!";
    // Duplicate Key Error (e.g., unique email)
    if (err.code === 11000) {
        const simplifiedError = (0, handlerDuplicateError_1.handlerDuplicateError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = (_a = simplifiedError.errorSources) !== null && _a !== void 0 ? _a : [];
    }
    // CastError (e.g., invalid ObjectId)
    else if (err.name === "CastError") {
        const simplifiedError = (0, handleCastError_1.handleCastError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = (_b = simplifiedError.errorSources) !== null && _b !== void 0 ? _b : [];
    }
    // Zod Validation Error
    else if (err.name === "ZodError") {
        const simplifiedError = (0, handlerZodError_1.handlerZodError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = (_c = simplifiedError.errorSources) !== null && _c !== void 0 ? _c : [];
    }
    // Mongoose Validation Error
    else if (err.name === "ValidationError") {
        const simplifiedError = (0, handlerValidationError_1.handlerValidationError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = (_d = simplifiedError.errorSources) !== null && _d !== void 0 ? _d : [];
    }
    // Custom AppError
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        errorSources = (_e = err.errorSources) !== null && _e !== void 0 ? _e : [];
    }
    // General JS Error
    else if (err instanceof Error) {
        message = err.message;
    }
    // Optional: log to console
    console.error("🔥 Global Error Handler Caught:", err);
    // Send error response
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
    });
};
exports.globalErrorHandler = globalErrorHandler;
