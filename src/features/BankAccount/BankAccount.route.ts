import express from "express";

import { createBAccCtr, deleteBAccCtr, populate, readBAccCtr } from "~/features/BankAccount/BankAccount.controller";

const bankAccountRouter = express.Router();

bankAccountRouter.post("/populate", populate);

bankAccountRouter.post("/", createBAccCtr);
bankAccountRouter.get("/:bAccIdHere", readBAccCtr);
bankAccountRouter.delete("/:bAccIdHere", deleteBAccCtr);

export { bankAccountRouter };
