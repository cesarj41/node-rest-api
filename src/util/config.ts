import { logger } from "../middlewares/Logger";

export function getEnvVariable(name: string, fallback = ""): string {
  const envVariable = process.env[name];
  const fallbackProvided = fallback.length;
  if (!envVariable && !fallbackProvided) {
    throw new Error(`Environment variable ${name} has not been set.`);
  }
  return envVariable || fallback;
}

export const log = logger.logger;