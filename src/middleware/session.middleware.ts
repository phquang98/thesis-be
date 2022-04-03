import { RequestHandler, Response, NextFunction } from "express";

export const createSession: RequestHandler = (req, res, next) => {
  console.log("CREATE-SESS LOG:", req.session, req.sessionID, req.session.userId);
  if (req.session.userId) {
    return res.status(400).json({ msg: `Session existed already! ${req.sessionID}` });
  }
  req.session.userId = "met moi vcl";
  return res.status(200).json({ msg: `Session created ${req.session.userId} ${req.sessionID}` });
};

// NOTE: volatile, some fucking reason express-session create sessionID for every HTTP request -> called this ONE TIME PER USER ONLY
export const deleteSession: RequestHandler = (req, res, next) => {
  console.log("DEL-SESS LOG:", req.session, req.sessionID, req.session.userId);

  if (req.sessionID) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(400).json({ msg: `Failed to destroy session ${req.sessionID ?? "cc"}` });
      }
    });
    return res.status(200).json({ msg: `Session Deleted ${req.sessionID}` });
  }
  return res.status(400).json({ msg: `Missing sessionID! ${req.sessionID ?? "cc"}` });
};

// call when user stays in website > 5 mins -> ask them -> if they ok -> FE called BE this fnc
// refresh the expires column in session table, sid unchanged (if want to change use regen)
export const reloadSession: RequestHandler = (req, res, next) => {
  console.log("RELOAD-SESS LOG:", req.session, req.sessionID, req.session.userId);

  if (req.sessionID) {
    req.session.reload((err) => {
      if (err) {
        return res.status(400).json({ msg: "Failed to reload session" });
      }
    });
    return res.status(200).json({ msg: "Session reloaded, extended ttl!" });
  }
  return res.status(400).json({ msg: "Missing session!" });
};
