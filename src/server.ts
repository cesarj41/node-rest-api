import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { RoutingControllersOptions, useExpressServer } from 'routing-controllers';
import cookieParser from 'cookie-parser';
import * as swaggerUiExpress from "swagger-ui-express";
import { handler, HttpStatusCodes, swagger, routingOption  } from "./util";
import { logger } from './components/logger/logger.middleware';
import { requestId } from './middlewares/requestId';
import { TodoController } from './components/todo/todo.controller';

const app = express();
const routing: RoutingControllersOptions = {
  routePrefix: "/api",
  defaultErrorHandler: false,
  controllers: [TodoController],
}
const spec = swagger();

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser("secret"));

// if (EnvVars.nodeEnv === NodeEnvs.Production) {
//   app.use(helmet());
// }
app.use(requestId);
app.use(logger);
app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
useExpressServer(app, routingOption());

// NOT_FOUND (404) middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((_, res, next) => {
  if (!res.headersSent) {
    res.status(HttpStatusCodes.NOT_FOUND).send({
      error: {
        message: "resource not found.",
      },
    });
  }
});

// Error middleware
app.use((
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  handler.handleError(req.log, err, res);
});

process.on("uncaughtException", (error: Error) => {
  handler.handleError(logger.logger, error);
  if(!handler.isTrustedError(error)) {
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
});

process.on("unhandledRejection", (reason) => {
  handler.handleError(logger.logger, reason);
});


export default app;
