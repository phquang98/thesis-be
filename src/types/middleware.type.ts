// This will be first line -> be as vague as possible, as those below must extends from this
import { RequestHandler } from "express";

import { TUserAcc } from "../util";

// type TReqParams = Record<string, unknown>;
type TReqParams = { userIdHere: string };

type TReqBody = {
  clientData: Pick<TUserAcc, "account_name" | "account_pwd">;
};

type TResBody = {
  msg: string;
  affectedResource: string;
  serverData?: Record<string, unknown>;
};

export type TMddlwr = RequestHandler<TReqParams, TResBody, TReqBody>;
