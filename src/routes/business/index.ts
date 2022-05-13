import express from "express";

import { bankAccountRouter } from "~/features/BankAccount/BankAccount.route";
import { finTransactionRouter } from "~/features/FinTransaction/FinTransaction.route";
import { userAccountRouter } from "~/features/UserAccount/UserAccount.route";
import { userInfoRouter } from "~/features/UserInfo/UserInfo.route";

const businessRouter = express.Router();

businessRouter.use("/bankAccount", bankAccountRouter);
businessRouter.use("/transact", finTransactionRouter);
businessRouter.use("/account", userAccountRouter); // not used atm
businessRouter.use("/userinfo", userInfoRouter);

export { businessRouter };
