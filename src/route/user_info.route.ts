import express from "express";

import { createUInfo, readUInfo, updateUInfo } from "../controller";
import { authN, authZ } from "../middleware";

const userInfoRouter = express.Router();

userInfoRouter.post("/", createUInfo); // internally only
userInfoRouter.get("/:userIdHere", readUInfo);
userInfoRouter.put("/:userIdHere", updateUInfo);

// userInfoRouter.get("/:userIdHere", [authN, authZ], readUInfo);
// userInfoRouter.put("/:userIdHere", [authN, authZ], updateUInfo);

export { userInfoRouter };
