import { RequestHandler } from "express";

import { TUserAcc } from "./";

// Typings for all middlewares, maybe incorrect

type TReqParams = { userIdHere: string };

type TReqBody = {
  clientData: Pick<TUserAcc, "account_name" | "account_pwd">;
};

type TResBody = {
  msg: string;
  affectedResource: string;
  serverData: Record<string, string>;
};

export type TMddlwr = RequestHandler<TReqParams, TResBody, TReqBody>;
