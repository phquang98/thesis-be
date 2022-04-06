import express from "express";

import { createUAcc } from "../controller";
import { checkReqBodyMddlwr, checkReqParamsMddlwr, deleteSession } from "../middleware";
import { authN, authZ } from "../middleware/auth.middleware";
import { loginHandler, logoutHandler } from "../middleware/log_in_out.middleware";
import { createSession, reloadSession } from "../middleware/";
// import { loginHandler } from "../middleware/log_in_out.middleware";

const userAccountRouter = express.Router();

userAccountRouter.post("/register", checkReqBodyMddlwr(["name", "email", "account_name", "account_pwd"]), createUAcc);
userAccountRouter.post("/login", checkReqBodyMddlwr(["account_name", "account_pwd"]), loginHandler, createSession);
userAccountRouter.post("/:userIdHere/reload", checkReqParamsMddlwr, [authN, authZ], reloadSession);

userAccountRouter.post("/logout", logoutHandler, deleteSession);

// TODO: use this route to play with session and sessionId
// userAccountRouter.get("/showResource", [authZ]);

export { userAccountRouter };
