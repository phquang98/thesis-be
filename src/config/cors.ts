import { CorsOptions } from "cors";

import { envChecker } from "~/config";

const envObj = envChecker();

export const appCORSOpts: CorsOptions = {
  origin: envObj.EXPRESS_APP_CLIENT_ORIGIN,
  credentials: true,
  // allowedHeaders: ["Origin, Content-Type, Accept"],
  methods: ["GET, PUT, POST, DELETE"],
  // axios when CORS -> OPTIONS HTTP (from axios) -> use maxAge to prevents it <https://stackoverflow.com/a/40373949/8834000>
  maxAge: 24000
};

// Notes: FE and BE probably will be in the same hostname (e.g same nginx server)
// - origin: the original place that the Request comes from
//   must have scheme (e.g HTTP) + hostname (e.g localhost) + port (e.g 4000)
