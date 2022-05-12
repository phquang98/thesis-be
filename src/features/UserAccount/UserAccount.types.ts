import { RequestHandler } from "express";

import { TUInfo } from "~/types/business";
import { TBaseReqQuery, TBaseResBody, TBaseResLocals } from "~/types/system";

// --- Entity typings ---

export type TUAcc = {
  accountName: string;
  accountPwd: string;
  isAdmin: boolean;
  user_id: string;
};

// --- Controller typings ---

type UAccReqParams = { userIdHere: string };

type UAccResBody = TBaseResBody & {
  serverData: Record<string, never>;
};

// TODO: this should not be in here, UserAccount is a resource, register is a system
type UAccReqBody = {
  clientData: Pick<TUAcc, "accountName" | "accountPwd"> & Pick<TUInfo, "email" | "name">;
};

export type TUAccController = RequestHandler<UAccReqParams, UAccResBody, UAccReqBody, TBaseReqQuery, TBaseResLocals>;
