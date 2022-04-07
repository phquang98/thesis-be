import dotenv from "dotenv";
import session, { SessionOptions } from "express-session";
import connectPgSimple from "connect-pg-simple";
import { Pool, PoolConfig } from "pg";

dotenv.config();

// --- PostgreSQL Session Store + connect-pg-simple Config ---

const pgSess = connectPgSimple(session);

const pgPoolConf: PoolConfig = {
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME ?? "postgres",
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
  max: 10, // same as TypeORM
  idleTimeoutMillis: 1000, // close idle clients after 1 second
  connectionTimeoutMillis: 1000 // return an error after 1 second if connection could not be established
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

export const sessOpts: SessionOptions = {
  secret: process.env.SESS_SECRET || "very_secret",
  name: process.env.COOKIE_NAME || "test_cookie",
  store: pgSessStore,
  cookie: {
    maxAge: 600000, //  1000 * 60 * 60 = 1h === 3600000 (1000 for testing) (600000 = 10min)
    httpOnly: true, // careful with this ???
    secure: false, // careful with this ??? set nodejs trust proxy if use proxy like nginx
    sameSite: "lax", // lax strict none clgt ???
    path: "/"
    // domain: "http://localhost:4000" // this shit cause error ???
    // signed: ???
  },
  saveUninitialized: false, // don't save empty session right from start
  resave: false
};

/** Explain: configurations used by `express-session` using Session Store from connect-pg-simple
 * Notes:
 * - check any missing .env key-pair, `pruneSessionInterval`, `maxAge`
 */
