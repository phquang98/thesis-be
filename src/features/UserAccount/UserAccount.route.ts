import express from "express";

// import { authN, authZ } from "../middleware";

const userAccountRouter = express.Router();

// userAccountRouter.post("/"); // CREATE, handled in /register
// userAccountRouter.put("/:userIdHere");
userAccountRouter.get("/:userIdHere"); // e.g when forget account_name, provided email to see account_name
// userAccountRouter.delete("/:userIdHere");

// userAccountRouter.get("/:userIdHere", [authN, authZ], readUAcc);

export { userAccountRouter };
