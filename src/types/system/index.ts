import { HttpStatusCode } from "~/utils/constants";

// --- Controller Typings ---

export type BaseResBody = {
  statusCode: HttpStatusCode;
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
