import { RequestHandler } from "express";

// TODO: finish this

// maybe also create another middlewares called sanitize: clean input in req.body first before do any shit

// Logout user and manually pruning
// May need: req.session.destroy()

// Asking user if wish to still want to use the website
// May need: req.session.regenerate()

// May need for redirection: manually req.session.save() as they will be auto called normally

/** Explain: API resolver for:
 * - giving Cookie that contains `sid` to User after login
 * - prune outdated session if User logout
 *
 */

// <https://stackoverflow.com/a/20638421/8834000>

// check if Request has Cookie flag in HTTP Header
// yes -> authN OK
// no -> authN failed
export const authN: RequestHandler = (req, res, next) => {
  console.log("temp");
};

// only runs when authN OK
// lookup sess record in DB based on sid in Cookie flag
// find out userId in sess JSON object
// check if sess.userId === req.params.userIDHere
// yes -> authZ OK
// no -> authZ failed
export const authZ: RequestHandler = (req, res, next) => {
  console.log("temp");
};
