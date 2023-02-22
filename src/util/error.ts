/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { randomUUID } from "crypto";
import { Response } from "express";
import { HttpStatusCodes } from "@src/util";
import { logger } from "../middlewares/Logger";
import { HttpError } from "routing-controllers";
class ErrorHandler {
  public handleError(
    log: typeof logger["logger"],
    error: Error | unknown,
    res?: Response,
  ): void {
    (error as any).traceId = randomUUID();
    log.error(error);
    if (!res || res.headersSent) {
      return;
    }

    if (error instanceof HttpError) {
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
  public isTrustedError(error: Error) {
    return error instanceof HttpError;
  }
}

export const handler = new ErrorHandler();
