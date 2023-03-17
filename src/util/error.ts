/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { randomUUID } from "crypto";
import { Response } from "express";
import { HttpStatusCodes } from "@src/util";
import { logger } from "../middlewares/Logger";

export class ServerError extends Error {
  public httpCode: HttpStatusCodes;
  public isTrusted: boolean;
  constructor(...message: string[]) {
    super(message.join());
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.httpCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    this.isTrusted = false;
    Error.captureStackTrace(this);
  }
}

export class NotFoundError extends ServerError {
  constructor(message?: string) {
    super(message ?? "Resource not found");
    this.httpCode = HttpStatusCodes.NOT_FOUND;
    this.isTrusted = true;
  }
}

export class BadRequestError extends ServerError {
  constructor(...message: string[]) {
    super(message?.join());
    this.httpCode = HttpStatusCodes.BAD_REQUEST;
    this.isTrusted = true;
  }
}


class ErrorHandler {
  public handleError(
    log: typeof logger["logger"],
    error: Error | ServerError | unknown,
    res?: Response,
  ): void {
    (error as any).traceId = randomUUID();
    log.error(error);
    if (!res || res.headersSent) {
      return;
    }

    if (error instanceof ServerError) {
      res.status(error.httpCode).send({
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
  public isTrustedError(error: Error | ServerError | unknown): boolean {
    if (error instanceof ServerError) {
      return error.isTrusted;
    }
    return false;
  }
}

export const handler = new ErrorHandler();
