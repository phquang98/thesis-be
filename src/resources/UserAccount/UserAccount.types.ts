import { RequestHandler } from "express";

import { TUInfo } from "~/types/business";
import { BaseReqQuery, BaseResBody, BaseResLocals } from "~/types/system";

// --- Entity typings ---

export type TUAcc = {
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

// TODO: this should not be in here, UserAccount is a resource, register is a system
type UAccReqBody = {
  clientData: Pick<TUAcc, "account_name" | "account_pwd"> & Pick<TUInfo, "email" | "name">;
};

export type TUAccController = RequestHandler<UAccReqParams, UAccResBody, UAccReqBody, BaseReqQuery, BaseResLocals>;
