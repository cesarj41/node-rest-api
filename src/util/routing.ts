import path from "path";
import { RoutingControllersOptions } from "routing-controllers";

export const routing: RoutingControllersOptions = {
  routePrefix: "/api",
  defaultErrorHandler: false,
  controllers: [path.join(__dirname, '..', '/modules/**/controllers/*{.js,.ts}')],
  middlewares: [path.join(__dirname, '..', '/modules/**/middlewares/*{.js,.ts}')],
};