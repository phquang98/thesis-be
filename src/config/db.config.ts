import dotenv from "dotenv";
import { createConnection, ConnectionOptions } from "typeorm";

import { BankAccount, FinTransaction, UserAccount, UserInfo } from "../entity";

dotenv.config();

const configPgTypeORM: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [BankAccount, FinTransaction, UserInfo, UserAccount],
  synchronize: true,
  logging: true
};

export const connPgDB = async (): Promise<void> => {
  if (Object.values(configPgTypeORM).some((ele) => ele === undefined || ele === "")) {
    console.log("Missing .env props, connection to DB can't be made!", configPgTypeORM);
    return;
  }
  try {
    await createConnection(configPgTypeORM);
    console.log("Connect to DB OK!");
    return;
  } catch (error) {
    console.log("Failed to make connection to Postgres DB!", error);
  }
};

/** Explain: configurations to make connection to a PostgreSQL DB using TypeORM
 * Notes:
 * - check any missing .env key-pair
 * - [typeorm by default create a pool for you out of the box](https://stackoverflow.com/questions/46843248/create-connection-pool-typeorm)
 */
