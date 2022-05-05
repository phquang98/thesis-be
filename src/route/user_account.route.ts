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

userAccountRouter.post("/register", createUAcc);

userAccountRouter.post("/login", loginHandler, createSession);

userAccountRouter.post("/:userIdHere/reload", reloadSession);

userAccountRouter.post("/:userIdHere/logout", deleteSession);

// userAccountRouter.post("/register", checkReqBodyMddlwr(["name", "email", "account_name", "account_pwd"]), createUAcc);

// userAccountRouter.post("/login", checkReqBodyMddlwr(["account_name", "account_pwd"]), loginHandler, createSession);

// userAccountRouter.post("/:userIdHere/reload", checkReqParamsMddlwr, [authN, authZ], reloadSession);

// userAccountRouter.post("/:userIdHere/logout", checkReqParamsMddlwr, [authN, authZ], deleteSession);

export { userAccountRouter };
