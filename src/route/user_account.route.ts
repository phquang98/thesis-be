import express from "express";

import { createUAcc } from "../controller";
import { createSession, deleteSession, reloadSession } from "../middleware";
import { testPostLogin } from "../middleware/test";

const userAccountRouter = express.Router();

userAccountRouter.post("/register", createUAcc);
userAccountRouter.post("/login", createSession, testPostLogin);
userAccountRouter.post("/logout", deleteSession);

// TODO: use this route to play with session and sessionId
// userAccountRouter.post("/showResource/:asd/to/:dsa");

userAccountRouter.post("/reload", reloadSession);

export { userAccountRouter };
