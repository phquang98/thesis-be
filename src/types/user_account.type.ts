import { RequestHandler } from "express";

import { TUInfo } from "../util";

// --- Resource typings ---

export type TUserAcc = {
  account_name: string;
  account_pwd: string;
  is_admin: boolean;
  user_id: string;
};

// --- Controller typings ---

type TReqParams = { userIdHere: string };

type TReqBody = {
  clientData: Pick<TUserAcc, "account_name" | "account_pwd"> & Pick<TUInfo, "name" | "email">;
};

type TResBody = {
  msg: string;
  affectedResource: string;
  serverData?: Record<string, unknown>;
};

export type TUAccController = RequestHandler<TReqParams, TResBody, TReqBody>;
