import express from "express";

import { generateOneTransaction, readBalanceSheetByIndividual } from "../controller";

const finTransactionRouter = express.Router();

finTransactionRouter.get("/:bAccIdHere", readBalanceSheetByIndividual);

finTransactionRouter.post("/:bAccIdHere/transact", generateOneTransaction);
// bankAccountRouter.post(
//   "/:bAccIdHere/transact",
//   [checkReqParamsMddlwr, checkReqBodyMddlwr(["sender_baccid", "receiver_baccid", "amount"])],
//   generateOneTransaction
// );

export { finTransactionRouter };
