import express from "express";

import {
  createOneFinTransactCtr,
  readBankStatementCtr,
  readOneFinTransactCtr
} from "~/features/FinTransaction/FinTransaction.controller";

const finTransactionRouter = express.Router();

finTransactionRouter.get("/:finTransactIdHere", readOneFinTransactCtr);
finTransactionRouter.get("/statement", readBankStatementCtr);
// finTransactionRouter.get("/sender");
// finTransactionRouter.get("/receiver");
finTransactionRouter.post("/", createOneFinTransactCtr);

export { finTransactionRouter };
