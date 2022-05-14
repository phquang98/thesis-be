import express from "express";

import { readUserInfoCtr, updateUserInfoCtr } from "~/features/UserInfo/UserInfo.controller";
import { authN } from "~/middlewares/auth/authN.middleware";
import { authZUserId } from "~/middlewares/auth/authZ.middleware";
import { validateUInfo } from "~/middlewares/check/validate.middleware";
import { clientSchemaUInfo } from "~/types/business";

// import { authN, authZ } from "../middleware";

const userInfoRouter = express.Router();

userInfoRouter.post("/"); // internally only
userInfoRouter.get("/:userIdHere", readUserInfoCtr);
userInfoRouter.put("/:userIdHere", validateUInfo(clientSchemaUInfo), authZUserId, updateUserInfoCtr);

// userInfoRouter.get("/:userIdHere", [authN, authZ], readUInfo);
// userInfoRouter.put("/:userIdHere", [authN, authZ], updateUInfo);

export { userInfoRouter };
