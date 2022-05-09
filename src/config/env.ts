/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import dotenv from "dotenv";
import { cleanEnv, str } from "envalid";

dotenv.config();

export const envChecker = () => {
  return cleanEnv(process.env, {
    NODE_ENV: str({ choices: ["development", "production"] }),
    EXPRESS_APP_HOSTNAME: str(),
    EXPRESS_APP_PORT: str(),
    EXPRESS_APP_CLIENT_ORIGIN: str(),
    // EXPRESS_APP_DB_URL: str(),
    EXPRESS_APP_DB_HOSTNAME: str(),
    EXPRESS_APP_DB_PORT: str(),
    EXPRESS_APP_DB_USERNAME: str(),
    EXPRESS_APP_DB_PASSWORD: str(),
    EXPRESS_APP_DB_NAME: str(),
    EXPRESS_APP_SESS_SECRET: str(),
    EXPRESS_APP_COOKIE_NAME: str()
  });
};
