import dotenv from "dotenv";
import session, { SessionOptions } from "express-session";
import connectPgSimple from "connect-pg-simple";
import { Pool, PoolConfig } from "pg";

import { envChecker } from "~/config";

dotenv.config();

const envObj = envChecker();

// --- PostgreSQL Session Store + connect-pg-simple Config ---
const pgSess = connectPgSimple(session);

const pgPoolConf: PoolConfig = {
  database: envObj.EXPRESS_APP_DB_NAME,
  user: envObj.EXPRESS_APP_DB_USERNAME,
  password: envObj.EXPRESS_APP_DB_PASSWORD,
  port: Number(envObj.EXPRESS_APP_DB_PORT),
  max: 10, // same as TypeORM
  idleTimeoutMillis: 1000, // close idle clients after 2 second
  connectionTimeoutMillis: 1000 // return an error after 2 second if connection could not be established
};

// create a Pool conn for connect-pg-simple, recommended by author
const poolInstance = new Pool(pgPoolConf);

// create a sessStore
const pgSessStore = new pgSess({
  pool: poolInstance,
  createTableIfMissing: true
  // pruneSessionInterval: 3, // prune time (auto del outdated session records) = this number + maxAge below
  // ttl: 0                   // for some reason dont have the response time as good like prune
});

// --- Session Config ---

export const appSessOpts: SessionOptions = {
  secret: envObj.EXPRESS_APP_SESS_SECRET,
  name: envObj.EXPRESS_APP_COOKIE_NAME,
  store: pgSessStore,
  cookie: {
    maxAge: 600000, //  1000 * 60 * 60 = 1h === 3600000 (1000 for testing) (600000 = 10min)
    httpOnly: true, // careful with this ???
    secure: false, // careful with this ??? set nodejs trust proxy if use proxy like nginx
    sameSite: "lax", // lax strict none clgt ???
    path: "/"
    // domain: "http://127.0.0.1" // <https://stackoverflow.com/a/1188145/8834000>
    // signed: ???
  },
  saveUninitialized: false, // don't save empty session right from start
  resave: false
};

/** Explain: configurations used by `express-session` using Session Store from connect-pg-simple
 * Notes:
 * - check any missing .env key-pair, `pruneSessionInterval`, `maxAge`
 */
