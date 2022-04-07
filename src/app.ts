import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import express from "express";
import session from "express-session";

import { confObj } from "./config";
import { bankAccountRouter, transactionRouter, userAccountRouter, userInfoRouter } from "./route";

// --- Config + Initiate server ---
dotenv.config();

const app = express();

const { confServer, connPgDB, sessOpts } = confObj;

// --- Top Lv Middlewares ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use(cors(confServer.customCORSOpts));
app.use(session(sessOpts));

app.use("/", userAccountRouter);
app.use("/bankaccount", bankAccountRouter);
app.use("/transaction", transactionRouter);
app.use("/user/info", userInfoRouter);

// --- Make CXN to DB ---
connPgDB();

// --- Start server ---
app.listen(confServer.port, () => {
  console.log(`Server started at port ${confServer.port}!`);
});
