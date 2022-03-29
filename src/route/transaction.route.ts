import express from "express";

import { readBalanceSheetByIndividual } from "../controller";

const transactionRouter = express.Router();

transactionRouter.get("/individual/:bAccountIDHere", readBalanceSheetByIndividual);

export { transactionRouter };
