import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import express from "express";

import "module-alias/register";

import { appRouter } from "~/route";

// --- Config + Initiate server ---
dotenv.config(); // read key-value pairs from .env
const port = process.env.PORT_NUMBER_HERE || 4000;

const app = express(); // create an express app server

// --- Top Lv Middlewares ---
app.use(express.json()); // TLDR can send json data from FE to endpoints
app.use(express.urlencoded({ extended: true })); // if use Form submit, data from form will be written to req.body
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use(cors());

// --- Run server ---
app.use(appRouter);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
