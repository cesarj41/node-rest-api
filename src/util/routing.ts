import path from "path";
import { RoutingControllersOptions } from "routing-controllers";

export function routingOption (): RoutingControllersOptions {
  return {
    routePrefix: "/api",
    defaultErrorHandler: false,
    controllers: [path.join(__dirname, "..", "components/**/*.controller.ts")],
  };
}