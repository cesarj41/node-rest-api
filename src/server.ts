/* eslint-disable no-process-exit */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { handler, HttpStatusCodes } from "./util";
import { logger, identifier } from "./middlewares/Logger";
import { env } from "./constants";
import todoRouter from "./modules/todo/todo.router";

const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(env.CookieProps.Secret));

if (env.nodeEnv === "production") {
  app.use(helmet());
}
app.use(identifier);
app.use(logger);
app.use("/api/todos", todoRouter);

// NOT_FOUND (404) middleware
app.use((_, res, next) => {
  res.status(HttpStatusCodes.NOT_FOUND).send({
    error: {
      message: "resource not found.",
    },
  });
});

// Error middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  handler.handleError(req.log, err, res);
  if (!handler.isTrustedError(err)) {
    process.exit(1);
  }
});

process.on("unhandledRejection", (reason) => {
  throw reason;
});

process.on("uncaughtException", (error: Error) => {
  handler.handleError(logger.logger, error);
  if (!handler.isTrustedError(error)) {
    process.exit(1);
  }
});

export default app;
