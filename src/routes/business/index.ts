import express from "express";

import { userAccountRouter } from "~/resources/UserAccount/UserAccount.route";
import { userInfoRouter } from "~/resources/UserInfo/UserInfo.route";

const businessRouter = express.Router();

businessRouter.use("/userinfo", userInfoRouter);
businessRouter.use("/account", userAccountRouter);
// businessRouter.use("/bankAccount");
// businessRouter.use("/transact");

export { businessRouter };
