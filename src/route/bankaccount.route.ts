import express from "express";

import {
  readBankAccount,
  generateOneTransaction,
  simulateCashDeposit,
  createBankAccount,
  deleteBankAccount
} from "../controller/bankaccount.controller";

const bankAccountRouter = express.Router();

bankAccountRouter.post("/", createBankAccount);
bankAccountRouter.get("/:bAccountIDHere", readBankAccount);
bankAccountRouter.delete("/:bAccountIDHere", deleteBankAccount);

bankAccountRouter.post("/:bAccountIDHere", generateOneTransaction);
bankAccountRouter.post("/:bAccountIDHere/deposit", simulateCashDeposit);

export { bankAccountRouter };
