import dotenv from "dotenv";
import session, { SessionOptions } from "express-session";
import connectPgSimple from "connect-pg-simple";
import { createConnection, ConnectionOptions } from "typeorm";
import { Pool, PoolConfig } from "pg";
import { CorsOptions } from "cors";

import { BankAccount } from "../entity/bankaccount.entity";

dotenv.config();

// --- Server Config ---
const SERVER_PORT = process.env.SERVER_PORT || 4000;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";

const SERVER_CONF = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT
};

// --- CORS Config ---

/** Explain: handles cors settings of the app, remember FE and BE will be same hostname (e.g same nginx server)
 *
 */
const customCORSOpts: CorsOptions = {
  origin: "http://localhost:3000", // must have scheme (e.g HTTP) + hostname (e.g localhost) + port (e.g 3000)
  credentials: true
};

// --- TypeORM CXN Config ---
const TYPEORM_POSTGRES_CONF: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME ?? "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [BankAccount],
  synchronize: true,
  logging: true
};

// --- PostgreSQL Session Store connect-pg-simple Config ---

const pgSession = connectPgSimple(session);

const poolIngredients: PoolConfig = {
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME ?? "postgres",
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
  max: 10, // same as TypeORM
  idleTimeoutMillis: 1000, // close idle clients after 1 second
  connectionTimeoutMillis: 1000 // return an error after 1 second if connection could not be established
};

// create a Pool CXN for connect-pg-simple, recommended cxn opts by author
const poolInstance = new Pool(poolIngredients);

// create store that will handles session stuffs from now
const postgresStore = new pgSession({
  pool: poolInstance,
  createTableIfMissing: true
  // pruneSessionInterval: 3, // prune time (auto del outdated session records) = this number + maxAge below
  // ttl: 0                   // for some reason dont have the response time as good like prune
});

// --- Session Config ---

// TODO: find out wtf all these opt props means
const sessionOpts: SessionOptions = {
  secret: "very_secret",
  name: "test_cookie", // the key name of first prop of the cookie when client receives
  store: postgresStore,
  cookie: {
    maxAge: 30000, //  1000 * 60 * 60 = 1h
    httpOnly: false, // careful with this ???
    secure: false, // careful with this ??? set nodejs trust proxy if use proxy like nginx
    sameSite: "lax" // lax strict none clgt ???
    // path: ???
    // domain: ???
    // signed: ???
  },
  saveUninitialized: false, // don't save empty session right from start
  resave: false
};

// --- Connection Method ---
const tryCXNPostgresDB = async (): Promise<void> => {
  if (Object.values(TYPEORM_POSTGRES_CONF).some((ele) => ele === undefined || ele === "")) {
    console.log("Missing .env props, cxn can't be made.", TYPEORM_POSTGRES_CONF);
    return;
  } else {
    try {
      await createConnection(TYPEORM_POSTGRES_CONF);
      console.log("Connect to DB OK!");
      return;
    } catch (error) {
      console.log("Sth wrong trying to cxn Postgres...", error);
    }
  }
};

export const xConfig = {
  server: SERVER_CONF,
  corsOpts: customCORSOpts,
  session: sessionOpts,
  postgresDB: TYPEORM_POSTGRES_CONF,
  cxnPostgresDB: tryCXNPostgresDB
};

/** Explain: create configuration data for Express server, typeorm, express-session and connect-pg-simple
 * Notes:
 * - check any missing .env key-pair, `pruneSessionInterval`, `maxAge`
 * - [typeorm by default create a pool for you out of the box](https://stackoverflow.com/questions/46843248/create-connection-pool-typeorm)
 * - connect-pg-simple needs a Pool and a pgSession-created from express-session to create a store ?
 */
