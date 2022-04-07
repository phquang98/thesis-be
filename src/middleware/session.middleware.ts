import { getRepository } from "typeorm";

import { UserAccount } from "../entity";
import { TMddlwr } from "../types/middleware.type";

/** Create a session record based on user credentials
 *
 * Put user_id inside session object
 */
export const createSession: TMddlwr = async (req, res, _next) => {
  if (req.session.user_id) {
    return res
      .status(400)
      .json({ msg: `Session existed already! ${req.sessionID}`, affectedResource: "Session Middleware" });
  }

  const { account_name } = req.body.clientData;
  const uAccTmp = await getRepository(UserAccount).findOne({ account_name });

  req.session.user_id = uAccTmp?.user_id; // TODO: put this in locals in previous mddlwr
  return res
    .status(200)
    .json({ msg: `Session created ${req.session.user_id} ${req.sessionID}`, affectedResource: "Middleware Session" });
};

/** Delete a session record based on cookie (must be logged in)
 *
 * Use when User clicks Logout btn
 * Should called this 1 time per logged user only
 */
export const deleteSession: TMddlwr = (req, res, _next) => {
  console.log("DEL-SESS LOG:", req.session, req.sessionID, req.session.user_id);

  if (req.session.user_id) {
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(400)
          .json({ msg: `Failed to destroy session ${req.sessionID}`, affectedResource: "Session Middleware" });
      }
    });
    return res.status(200).json({ msg: `Session ${req.sessionID} deleted!`, affectedResource: "Session Middleware" });
  }
  return res.status(400).json({ msg: `Session not recognized!`, affectedResource: "Session Middleware" });
};

/** Updates the `expires` column using cookie.maxAge
 *
 * Use this when User in FE with near-expire session -> FE ask if User want to reload -> if yes FE call this
 * reload() maintain sid, if want to change, use session.regenerate()
 */
export const reloadSession: TMddlwr = (req, res, _next) => {
  // console.log("RELOAD-SESS LOG:", req.session, req.sessionID, req.session.user_id);

  if (req.sessionID) {
    req.session.reload((err) => {
      if (err) {
        return res.status(400).json({ msg: "Failed to reload session", affectedResource: "Session Middleware" });
      }
    });
    return res.status(200).json({ msg: "Session reloaded, extended ttl!", affectedResource: "Session Middleware" });
  }
  return res.status(400).json({ msg: "Missing cookie!", affectedResource: "Session Middleware" });
};
