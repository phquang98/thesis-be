import { getRepository } from "typeorm";

import { UserAccount } from "../entity";
import { TMddlwr } from "../types";
import { HTTPStatusCode } from "../util";

/** Create session + returns sid in body
 *
 * - create a session record with user_id inside based on user credentials
 * - returns the sid in res.body for easy access (e.g FE put this in Context for usage)
 */
export const createSession: TMddlwr = async (req, res, _next) => {
  // refuses already logged-in user
  if (req.session.user_id) {
    return res.status(HTTPStatusCode.BAD_REQUEST).json({
      statusCode: HTTPStatusCode.BAD_REQUEST,
      msg: `Session existed already! user_id: ${req.session.user_id} | this sessionID: ${req.sessionID}`,
      affectedResource: "Session Middleware",
      serverData: {}
    });
  }

  const { account_name } = req.body.clientData;
  const uAccTmp = await getRepository(UserAccount).findOne({ account_name });

  req.session.user_id = uAccTmp?.user_id as string; // TODO: very dirty fix, put this in locals in previous mddlwr

  return res.status(HTTPStatusCode.OK).json({
    statusCode: HTTPStatusCode.OK,
    msg: `Session created user_id: ${req.session.user_id} | this sessionID: ${req.sessionID}`,
    affectedResource: "Middleware Session",
    serverData: {
      user_id: req.session.user_id,
      sid: req.sessionID
    }
  });
};

/** Delete a session record based on cookie (must be logged in)
 *
 * - use when Client clicks Logout btn
 * - should called this 1 time per logged user only
 */
export const deleteSession: TMddlwr = (req, res, _next) => {
  // console.log("DEL-SESS LOG:", req.session, req.sessionID, req.session.user_id);

  if (req.session.user_id) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(HTTPStatusCode.BAD_REQUEST).json({
          statusCode: HTTPStatusCode.BAD_REQUEST,
          msg: `Failed to destroy session ${req.sessionID}`,
          affectedResource: "Session Middleware",
          serverData: {}
        });
      }
    });
    return res.status(HTTPStatusCode.OK).json({
      statusCode: HTTPStatusCode.OK,
      msg: `Session ${req.sessionID} deleted!`,
      affectedResource: "Session Middleware",
      serverData: {}
    });
  }
  return res.status(HTTPStatusCode.BAD_REQUEST).json({
    statusCode: HTTPStatusCode.BAD_REQUEST,
    msg: `Session not recognized! Probably missing user_id prop in sess record.`,
    affectedResource: "Session Middleware",
    serverData: {}
  });
};

/** Updates the `expires` column using cookie.maxAge
 *
 * - use when Client with near-expire session -> FE ask if Client want to reload -> if yes FE call this
 * - reload() maintain sid, if want to change, use session.regenerate()
 */
export const reloadSession: TMddlwr = (req, res, _next) => {
  // console.log("RELOAD-SESS LOG:", req.session, req.sessionID, req.session.user_id);

  if (req.session.user_id) {
    req.session.reload((err) => {
      if (err) {
        return res.status(HTTPStatusCode.BAD_REQUEST).json({
          statusCode: HTTPStatusCode.BAD_REQUEST,
          msg: "Failed to reload session",
          affectedResource: "Session Middleware",
          serverData: {}
        });
      }
    });
    return res.status(HTTPStatusCode.OK).json({
      statusCode: HTTPStatusCode.OK,
      msg: "Session reloaded, extended ttl!",
      affectedResource: "Session Middleware",
      serverData: {}
    });
  }
  return res.status(HTTPStatusCode.BAD_REQUEST).json({
    statusCode: HTTPStatusCode.BAD_REQUEST,
    msg: "Missing cookie!",
    affectedResource: "Session Middleware",
    serverData: {}
  });
};
