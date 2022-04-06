// import dotenv from "dotenv";
// import { CorsOptions } from "cors";

// dotenv.config();

// const SERVER_PORT = process.env.SERVER_PORT || 4000;
// const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";

// export const SERVER_CONF = {
//   hostname: SERVER_HOSTNAME,
//   port: SERVER_PORT
// };

// --- CORS Config ---

// handles cors settings of the app, remember FE and BE will be same hostname (e.g same nginx server)
// const customCORSOpts: CorsOptions = {
//   origin: "http://localhost:4000", // must have scheme (e.g HTTP) + hostname (e.g localhost) + port (e.g 3000)
//   credentials: true
// };
