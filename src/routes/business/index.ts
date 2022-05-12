import express from "express";

import { bankAccountRouter } from "~/features/BankAccount/BankAccount.route";
import { finTransactionRouter } from "~/features/FinTransaction/FinTransaction.route";
import { userAccountRouter } from "~/features/UserAccount/UserAccount.route";
import { userInfoRouter } from "~/features/UserInfo/UserInfo.route";

const businessRouter = express.Router();

businessRouter.use("/userinfo", userInfoRouter);
businessRouter.use("/account", userAccountRouter);
businessRouter.use("/bankAccount", bankAccountRouter);
businessRouter.use("/transact", finTransactionRouter);

export { businessRouter };
