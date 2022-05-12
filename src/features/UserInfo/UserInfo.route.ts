import express from "express";

import { readUserInfoCtr, updateUserInfoCtr } from "~/features/UserInfo/UserInfo.controller";

// import { authN, authZ } from "../middleware";

const userInfoRouter = express.Router();

userInfoRouter.post("/"); // internally only
userInfoRouter.get("/:userIdHere", readUserInfoCtr);
userInfoRouter.put("/:userIdHere", updateUserInfoCtr);

// userInfoRouter.get("/:userIdHere", [authN, authZ], readUInfo);
// userInfoRouter.put("/:userIdHere", [authN, authZ], updateUInfo);

export { userInfoRouter };
