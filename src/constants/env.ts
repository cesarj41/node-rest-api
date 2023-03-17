/**
 * Environments variables declared here.
 */

/* eslint-disable node/no-process-env */

function getEnvVariable<T>(name: string, fallback?: T): T {
  const variable = process.env[name];

  if (typeof variable === "undefined") {
    if (typeof fallback === "undefined") {
      throw new Error(`no entry found for env ${name}`);
    }
    return fallback;
  }

  return variable as T;
}
export const  env = {
  nodeEnv: getEnvVariable<string>("NODE_ENV"),
  Port: getEnvVariable("PORT", 8080),
  CookieProps: {
    Key: 'YOUr_KEY_HERE',
    Secret: getEnvVariable<string>("COOKIE_SECRET"),
    // Casing to match express cookie options
    Options: {
      httpOnly: true,
      signed: true,
      path: getEnvVariable<string>("COOKIE_PATH"),
      maxAge: Number(getEnvVariable("COOKIE_EXP", 0)),
      domain: getEnvVariable("COOKIE_DOMAIN", ""),
      secure: getEnvVariable("SECURE_COOKIE", true),
    },
  },
  log: {
    level:getEnvVariable("LOG_LEVEL", "info"),
  },
};