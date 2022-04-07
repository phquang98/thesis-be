import { connPgDB } from "./db.config";
import { confServer } from "./server.config";
import { sessOpts } from "./session.config";

export const confObj = {
  confServer,
  connPgDB,
  sessOpts
};
