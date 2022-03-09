import express from "express";

import {
  readBAccount,
  generateOneTransaction,
  simulateCashDeposit,
  createBAccount,
  deleteBAccount
} from "../controller/bankaccount.controller";

const bankAccountRouter = express.Router();

bankAccountRouter.post("/", createBAccount);
bankAccountRouter.get("/:bAccountIDHere", readBAccount);
bankAccountRouter.delete("/:bAccountIDHere", deleteBAccount);

bankAccountRouter.post("/:bAccountIDHere/transact", generateOneTransaction);
bankAccountRouter.post("/:bAccountIDHere/deposit", simulateCashDeposit);

export { bankAccountRouter };
