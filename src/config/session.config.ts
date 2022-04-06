// import dotenv from "dotenv";
// import session, { SessionOptions } from "express-session";
// import connectPgSimple from "connect-pg-simple";
// import { createConnection, ConnectionOptions } from "typeorm";
// import { Pool, PoolConfig } from "pg";
// import { CorsOptions } from "cors";

// // --- PostgreSQL Session Store + connect-pg-simple Config ---

// const pgSession = connectPgSimple(session);

// const poolIngredients: PoolConfig = {
//   database: process.env.DB_NAME,
//   user: process.env.DB_USERNAME ?? "postgres",
//   password: process.env.DB_PASSWORD,
//   port: Number(process.env.DB_PORT) || 5432,
//   max: 10, // same as TypeORM
//   idleTimeoutMillis: 1000, // close idle clients after 1 second
//   connectionTimeoutMillis: 1000 // return an error after 1 second if connection could not be established
// };

// // create a Pool CXN for connect-pg-simple, recommended cxn opts by author
// const poolInstance = new Pool(poolIngredients);

// // create store that will handles session stuffs from now
// const postgresStore = new pgSession({
//   pool: poolInstance,
//   createTableIfMissing: true
//   // pruneSessionInterval: 3, // prune time (auto del outdated session records) = this number + maxAge below
//   // ttl: 0                   // for some reason dont have the response time as good like prune
// });

// // --- Session Config ---

// // TODO: find out wtf all these opt props means
// const sessionOpts: SessionOptions = {
//   secret: "very_secret",
//   name: "test_cookie", // the key name of first prop of the cookie when client receives
//   store: postgresStore,
//   cookie: {
//     maxAge: 3600000, //  1000 * 60 * 60 = 1h === 3600000 (1000 for testing)
//     httpOnly: true, // careful with this ???
//     secure: false, // careful with this ??? set nodejs trust proxy if use proxy like nginx
//     sameSite: "lax", // lax strict none clgt ???
//     path: "/"
//     // domain: "http://localhost:4000" // this shit cause error ???
//     // signed: ???
//   },
//   saveUninitialized: false, // don't save empty session right from start
//   resave: false
// };

// export { postgresStore, sessionOpts };
