import express from "express";

import { readCltTransactionByIndividual } from "../controller";

const transactionRouter = express.Router();

transactionRouter.get("/individual/:bAccountIDHere", readCltTransactionByIndividual);

export { transactionRouter };
