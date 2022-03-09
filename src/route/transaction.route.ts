import express from "express";

import { readCltTransactionByReceiver, readCltTransactionBySender } from "../controller/transaction.controller";

const transactionRouter = express.Router();

transactionRouter.get("/sender/:bAccIDHere", readCltTransactionBySender);
transactionRouter.get("/receiver/:bAccIDHere", readCltTransactionByReceiver);

export { transactionRouter };
