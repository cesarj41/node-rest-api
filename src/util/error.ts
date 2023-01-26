import { randomUUID } from "crypto";
import { Response } from "express";
import { HttpStatusCodes } from "@src/util";
import { logger } from "../components/logger/logger.middleware";

export type ErrorType =
  | "INVALID_REQUEST"
  | "UNAUTHORIZE"
  | "FORBIDDEN"
  | "NOT_FOUND";

export class AppError extends Error {
  public readonly type: ErrorType;

  constructor(type: ErrorType, description?: string) {
    super(defaultMessage(type, description));

    Object.setPrototypeOf(this, new.target.prototype);

    this.type = type;

    Error.captureStackTrace(this);
  }
}

function defaultMessage(error: ErrorType, description?: string) {
  if (error === "FORBIDDEN") {
    return "You do not have permission to access this resource.";
  }

  if (error === "UNAUTHORIZE") {
    return "Unauthorized request, please login.";
  }

  return description || "";
}

function httpCode(error: ErrorType) {
  switch (error) {
    case "INVALID_REQUEST":
      return HttpStatusCodes.BAD_REQUEST;
    case "UNAUTHORIZE":
      return HttpStatusCodes.UNAUTHORIZED;
    case "FORBIDDEN":
      return HttpStatusCodes.FORBIDDEN;
    case "NOT_FOUND":
    return HttpStatusCodes.NOT_FOUND;
  }
}

class ErrorHandler {
  public handleError(
    log: typeof logger["logger"],
    error: Error | unknown,
    res?: Response,
  ): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (error as any).traceId = randomUUID();
    log.error(error);
    if (!res || res.headersSent) {
      return;
    }
    if (error instanceof AppError) {
      res.status(httpCode(error.type)).send({
        error: {
          message: error.message,
        },
      });
    } else {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
        error: {
          traceId: randomUUID(),
          message: "Internal server error, please contact support.",
        },
      });
    }
  }
  public isTrustedError(error: Error) {
    return error instanceof AppError;
  }
}

export const handler = new ErrorHandler();
