import express from "express";

import { readBankAccount, generateOneTransaction, simulateCashDeposit } from "../controller/bankaccount.controller";

const accountRouter = express.Router();

accountRouter.get("/:bAccountIDHere", readBankAccount);
accountRouter.post("/:bAccountIDHere", generateOneTransaction);
accountRouter.post("/:bAccountIDHere/deposit", simulateCashDeposit);

export { accountRouter };
