import express from "express";

import { userInfoRouter } from "~/resources/UserInfo/UserInfo.route";

const businessRouter = express.Router();

businessRouter.use("/userinfo", userInfoRouter);
// businessRouter.use("/account");
// businessRouter.use("/bankAccount");
// businessRouter.use("/transact");

export { businessRouter };
