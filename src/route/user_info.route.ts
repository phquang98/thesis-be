import express from "express";

import { createUInfo, readUInfo, updateUInfo } from "../controller";

const userInfoRouter = express.Router();

userInfoRouter.post("/", createUInfo);
userInfoRouter.get("/:userIDHere", readUInfo);
userInfoRouter.put("/:userIDHere", updateUInfo);

export { userInfoRouter };
