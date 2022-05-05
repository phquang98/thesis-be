import { RequestHandler } from "express";

import { TUInfo } from ".";
import { BaseReqQuery, BaseResBody, BaseResLocals } from "../util";

// --- Entity typings ---

export type TUserAcc = {
  account_name: string;
  account_pwd: string;
  is_admin: boolean;
  user_id: string;
};

// --- Controller typings ---

type UAccReqParams = { userIdHere: string };

type UAccResBody = BaseResBody & {
  serverData: Record<string, never>;
};

type UAccReqBody = {
  clientData: Pick<TUserAcc, "account_name" | "account_pwd"> & Pick<TUInfo, "name" | "email">;
};

export type TUAccController = RequestHandler<UAccReqParams, UAccResBody, UAccReqBody, BaseReqQuery, BaseResLocals>;
