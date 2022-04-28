import dotenv from "dotenv";
import { CorsOptions } from "cors";

dotenv.config();

// Remember FE and BE will be same hostname (e.g same nginx server)
const customCORSOpts: CorsOptions = {
  // origin here means the original place that the Request comes from
  // must have scheme (e.g HTTP) + hostname (e.g localhost) + port (e.g 4000)
  origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  credentials: true,
  // allowedHeaders: ["Origin, Content-Type, Accept"],
  methods: ["GET, PUT, POST, DELETE"],
  // axios when CORS -> OPTIONS HTTP -> use maxAge to prevents it <https://stackoverflow.com/a/40373949/8834000>
  maxAge: 24000
};

export const confServer = {
  hostname: process.env.SERVER_HOSTNAME || "localhost",
  port: process.env.SERVER_PORT || 4000,
  customCORSOpts
};
