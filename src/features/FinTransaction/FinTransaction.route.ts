import express from "express";

import {
  createOneFinTransactCtr,
  readBankStatementCtr,
  readOneFinTransactCtr
} from "~/features/FinTransaction/FinTransaction.controller";

const finTransactionRouter = express.Router();

finTransactionRouter.get("/statement", readBankStatementCtr); // this first or id === "statement"
finTransactionRouter.get("/:finTransactIdHere", readOneFinTransactCtr);
// finTransactionRouter.get("/sender");
// finTransactionRouter.get("/receiver");
finTransactionRouter.post("/", createOneFinTransactCtr);

export { finTransactionRouter };
