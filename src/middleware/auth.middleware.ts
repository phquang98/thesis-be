import { TMddlwr } from "../types";

// Authentication: check if Request has cookie contains sid + sid existed in `session` database
// Note: express-session will automatically fetch session record based on sid, only need to make sure client send req with cookie having sid inside
export const authN: TMddlwr = (req, res, next) => {
  // console.log("authN", req.sessionID, req.session);

  // worthless, as every request will have a sessionID, what matters is do it existed in DB or not
  // if (!req.sessionID) {
  //   ...codeHere
  // }

  // don't have user_id -> not yet saved in `session` table -> not logged in
  if (!req.session.user_id) {
    return res.status(400).json({ msg: "Session missing prop user_id!", affectedResource: "authN Middleware" });
  }
  return next();
};

// Authorization: check if Client can only request access to their resources
// Note: these two must match
// - req.params.userIdHere: resource belong to this client
// - req.session.user_id: identity of the client
export const authZ: TMddlwr = (req, res, next) => {
  // console.log("authZ", req.sessionID, req.session);

  // express-session somehow will auto fetch session record and sid, and this is done also in authN
  if (req.session.user_id === req.params.userIdHere) {
    return next();
  }
  return res.status(400).json({ msg: "Session not matched with logged user!", affectedResource: "AuthZ Middleware" });
};

// Explain:
// authN: are you in our database ?
// authZ: are you allow to see to access these resources ?
// - <https://stackoverflow.com/a/20638421/8834000>
