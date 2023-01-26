/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import expressPino from "express-pino-logger";

export const logger = expressPino({
  level: process.env.LOG_LEVEL || "info",
  serializers: {
    req(req) {
      const body_type = typeof req.raw.body;

      if (body_type === "object") {
        const { password, ...rest } = req.raw.body;
        req.body = rest
      } else {
        req.body = req.raw.body;
      }
      return req;
    },
  },
});
