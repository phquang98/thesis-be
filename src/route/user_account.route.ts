import express from "express";

const userAccountRouter = express.Router();

userAccountRouter.post("/register");
userAccountRouter.post("/login");
userAccountRouter.post("/logout");

userAccountRouter.post("/renewSession");

export { userAccountRouter };
