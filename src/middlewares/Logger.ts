/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { randomUUID } from "crypto";
import expressPino from "express-pino-logger";

export const logger = expressPino({
  level: process.env.LOG_LEVEL || "info",
  serializers: {
    req(req) {
      const body_type = typeof req.raw.body;

      if (body_type === "object") {
        const { password, ...rest } = req.raw.body;
        req.body = rest;
      } else {
        req.body = req.raw.body;
      }
      return req;
    },
  },
});

export function requestId (req: any, _: any, next: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  req.id = randomUUID();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  next();
}
