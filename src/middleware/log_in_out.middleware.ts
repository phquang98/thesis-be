import { RequestHandler, Request } from "express";
import { getRepository } from "typeorm";

import { UserAccount } from "../entity";
import { TMddlwr } from "../types/middleware.type";

// find user_account record that has creds -> pass to createSession
export const loginHandler: TMddlwr = async (req, res, next) => {
  const { account_name, account_pwd } = req.body.clientData;
  const suspect = await getRepository(UserAccount).findOne({ account_name }); // shorthand
  if (suspect) {
    return suspect.account_pwd === account_pwd
      ? next()
      : res.status(400).json({ msg: "Wrong credentials!", affectedResource: "UserAccount" });
  }
  return res.status(400).json({ msg: "Credentials not existed!", affectedResource: "Login Middleware" });
};

// pass this to destroySession
export const logoutHandler: RequestHandler = async (req, res, next) => {
  if (req.session.user_id) {
    return next();
  }
  return res.status(400).json({ msg: "Failed logout, no cookie!", affectedResource: "Logout Middleware" });
};
