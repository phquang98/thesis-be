import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import express from "express";
import session from "express-session";

import { xConfig } from "./config";
import { bankAccountRouter, transactionRouter, userAccountRouter, userInfoRouter } from "./route";

// --- Config + Initiate server ---
dotenv.config();
const port = process.env.PORT_NUMBER_HERE || 4000;

const app = express();

// --- Top Lv Middlewares ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use(cors(xConfig.corsOpts));
app.use(session(xConfig.session));

app.use("/", userAccountRouter);
app.use("/bankaccount", bankAccountRouter);
app.use("/transaction", transactionRouter);
app.use("/user/info", userInfoRouter);

// --- Make CXN to DB ---
xConfig.cxnPostgresDB();

// --- Start server ---
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
