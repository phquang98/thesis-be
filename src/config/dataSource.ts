import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { envChecker } from "~/config/env";
import { BankAccount } from "~/resources/BankAccount/BankAccount.entity";
import { UserAccount } from "~/resources/UserAccount/UserAccount.entity";
import { UserInfo } from "~/resources/UserInfo/UserInfo.entity";

const envObj = envChecker();
type TFoo = typeof envObj;

export const buildDSOpts = (envObjHere: TFoo): PostgresConnectionOptions => {
  if (Object.values(envObjHere).some((ele) => ele === "")) {
    console.error(envObjHere);
    throw new Error(".env files must not contain empty data...");
  }

  const dataSourceOpts: PostgresConnectionOptions = {
    // url: envObj.EXPRESS_APP_DB_URL,
    host: envObjHere.EXPRESS_APP_DB_HOSTNAME,
    port: Number(envObjHere.EXPRESS_APP_DB_PORT),
    username: envObjHere.EXPRESS_APP_DB_USERNAME,
    password: envObjHere.EXPRESS_APP_DB_PASSWORD,
    database: envObjHere.EXPRESS_APP_DB_NAME,
    entities: [UserInfo, UserAccount, BankAccount],
    logging: true,
    synchronize: true,
    type: "postgres"
    // logNotifications: true // same as logging: true but more vague ?
  };

  return dataSourceOpts;
};

export const appDataSource = new DataSource(buildDSOpts(envObj));

export const initialCxnDB = async (): Promise<void> => {
  try {
    await appDataSource.initialize();
    console.log("Connect to DB OK!");
  } catch (error) {
    throw new Error("Failed to make a connection to DB!");
  }
};
