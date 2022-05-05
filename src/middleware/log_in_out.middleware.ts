import { getRepository } from "typeorm";

import { UserAccount } from "../entity";
import { TMddlwr } from "../types";
import { HTTPStatusCode } from "../util";

// Takes submitted data from client -> find account_name in UAcc resource -> if account_pwd matches -> continue
export const loginHandler: TMddlwr = async (req, res, next) => {
  const { account_name, account_pwd } = req.body.clientData;
  const suspect = await getRepository(UserAccount).findOne({ account_name }); // shorthand
  if (suspect) {
    return suspect.account_pwd === account_pwd
      ? next()
      : res.status(HTTPStatusCode.BAD_REQUEST).json({
          statusCode: HTTPStatusCode.BAD_REQUEST,
          msg: "Wrong credentials!",
          affectedResource: "UserAccount",
          serverData: {}
        });
  }
  return res.status(HTTPStatusCode.BAD_REQUEST).json({
    statusCode: HTTPStatusCode.BAD_REQUEST,
    msg: "Credentials not existed!",
    affectedResource: "Login Middleware",
    serverData: {}
  });
};
