import { RequestHandler } from "express";

// TODO: think about all possible shit can do using req.session
// - give user cookie
// - proceed the cookie user sent with request
// - destroy cookie and session in store when user logout

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
