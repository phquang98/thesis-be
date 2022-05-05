import { RequestHandler } from "express";

import { BaseResBody } from "../util";
import { TUserAcc } from "./";

// Typings for all middlewares, maybe incorrect

type TReqParams = { userIdHere: string };

type TReqBody = {
  clientData: Pick<TUserAcc, "account_name" | "account_pwd">;
};

type TResBody = BaseResBody & {
  serverData: Record<string, string>;
};

export type TMddlwr = RequestHandler<TReqParams, TResBody, TReqBody>;
