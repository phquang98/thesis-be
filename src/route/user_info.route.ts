import express from "express";

import { createUInfo, readUInfo, updateUInfo } from "../controller";

const userInfoRouter = express.Router();

userInfoRouter.post("/", createUInfo);
userInfoRouter.get("/:userIdHere", readUInfo);
userInfoRouter.put("/:userIdHere", updateUInfo);

export { userInfoRouter };
