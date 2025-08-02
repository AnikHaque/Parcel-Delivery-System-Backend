import { Request, Response, NextFunction } from "express";
import { handleCastError } from "../helpers/handleCastError";
import { handlerZodError } from "../helpers/handlerZodError";
import { handlerValidationError } from "../helpers/handlerValidationError";
import { TErrorSources } from "../interface/error.typs";
import { handlerDuplicateError } from "../helpers/handlerDuplicateError";
import AppError from "../errorHelpers/AppError";

export const globalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  let errorSources: TErrorSources[] = [];
  let statusCode = 500;
  let message = "Something went wrong!";

  if (err.code === 11000) {
    const simplifiedError = handlerDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources ?? [];
  }


  else if (err.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources ?? [];
  }


  else if (err.name === "ZodError") {
    const simplifiedError = handlerZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources ?? [];
  }


  else if (err.name === "ValidationError") {
    const simplifiedError = handlerValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources ?? [];
  }


  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = err.errorSources ?? [];
  }


  else if (err instanceof Error) {
    message = err.message;
  }


  console.error("🔥 Global Error Handler Caught:", err);


  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
  });
};
