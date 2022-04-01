import express from "express";

import { createUAcc } from "../controller";

const userAccountRouter = express.Router();

userAccountRouter.post("/register", createUAcc);
userAccountRouter.post("/login");
userAccountRouter.post("/logout");

userAccountRouter.post("/renewSession");

export { userAccountRouter };
