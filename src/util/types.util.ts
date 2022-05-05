import { HTTPStatusCode } from "./constants";

// --- Controller Typings ---

export type BaseResBody = {
  statusCode: HTTPStatusCode;
  msg: string;
  affectedResource: string;
};

export type BaseReqQuery = Record<string, unknown>;

export type BaseResLocals = Record<string, unknown>;

// NOTE: might not need this, e.g req.session.customDataHere ?== res.locals
// export type xReq = Request & {
//   session: Session & Partial<SessionData> & { customDataHere?: string };
//   sessionID: string;
// };

// --- Application Typings ---

type TUser = {
  id: string;
  name: string;
  age: number;
  email: string;
  address: string;
  gender: string;
  pnum: string;
};

export type TCustomerAccount = TUser & { is_admin: false; pwd: string };

export type TAdminAccount = TUser & { is_admin: true; pwd: string };

// --- Custom defined type guards ---

/**
 * Predicate fnc return boolean based on if keyHere belongs in objHere and keyHere is a property of type T. Use when have an obj and unsure its types, but take a guess it is from type T
 *
 * @param keyHere
 * @param objHere
 * @returns
 * <https://stackoverflow.com/a/58962072/8834000>
 */

export function isObjKey<T>(keyHere: PropertyKey, objHere: T): keyHere is keyof T {
  return keyHere in objHere;
}
