import dotenv from "dotenv";
import { CorsOptions } from "cors";

dotenv.config();

// Remember FE and BE will be same hostname (e.g same nginx server)
const customCORSOpts: CorsOptions = {
  // origin here means the original place that the Request comes from
  origin: "http://localhost:3000", // must have scheme (e.g HTTP) + hostname (e.g localhost) + port (e.g 4000)
  credentials: true
};

export const confServer = {
  hostname: process.env.SERVER_HOSTNAME || "localhost",
  port: process.env.SERVER_PORT || 4000,
  customCORSOpts
};
