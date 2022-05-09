import morgan from "morgan";
import cors from "cors";
import express from "express";
import session from "express-session";

import { appRouter } from "~/route";
import { appCORSOpts } from "~/config/cors";
import { appSessOpts } from "~/config/session";

// --- Config + Initiate server ---
export const server = express();

// --- Top Lv Middlewares ---
server.use(express.json()); // TLDR can send json data from FE to endpoints
server.use(express.urlencoded({ extended: true })); // if use Form submit, data from form will be written to req.body
server.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
server.use(cors(appCORSOpts));
server.use(session(appSessOpts));

// --- Routing ---
server.use(appRouter);
