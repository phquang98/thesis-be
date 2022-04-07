import { RequestHandler } from "express";

import { TUserAcc, TUInfo } from "../util";

// type TReqParams = Record<string, unknown>;
type TReqParams = { userIdHere: string };

type TReqBody = {
  clientData: Pick<TUserAcc, "account_name" | "account_pwd"> & Pick<TUInfo, "name" | "email">;
};

type TResBody = {
  msg: string;
  affectedResource: string;
  serverData?: Record<string, unknown>;
};

export type TUAccCtrller = RequestHandler<TReqParams, TResBody, TReqBody>;
