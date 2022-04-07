import express from "express";

import { createUAcc } from "../controller";
import {
  checkReqParamsMddlwr,
  checkReqBodyMddlwr,
  createSession,
  reloadSession,
  deleteSession,
  loginHandler,
  authN,
  authZ
} from "../middleware";

const userAccountRouter = express.Router();

userAccountRouter.post("/register", checkReqBodyMddlwr(["name", "email", "account_name", "account_pwd"]), createUAcc);

userAccountRouter.post("/login", checkReqBodyMddlwr(["account_name", "account_pwd"]), loginHandler, createSession);

userAccountRouter.post("/:userIdHere/reload", checkReqParamsMddlwr, [authN, authZ], reloadSession);

userAccountRouter.post("/:userIdHere/logout", [authN, authZ], deleteSession);

// userAccountRouter.post("/:userIdHere/close", deleteUAcc);

export { userAccountRouter };
