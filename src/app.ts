import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import express from "express";

// --- Config + Initiate server ---
dotenv.config(); // read key-value pairs from .env
const port = process.env.PORT_NUMBER_HERE || 3000; //

const app = express(); // create an express app server

// --- Top Lv Middlewares ---
app.use(express.json()); // TLDR can send json data from FE to endpoints
app.use(express.urlencoded({ extended: true })); // if use Form submit, data from form will be written to req.body
app.use(morgan(":method :url :status :res[content-length] - :response-time ms")); // TLDR logger
app.use(cors()); // TLDR allow dif origin to HTTP to this server

// --- Run server ---
app.get("/healthcheck", (req, res, _next) => {
  return res.status(200).json({ msg: "Hello there!" });
});

app.post("/healthcheck", (req, res, _next) => {
  if (req.body.myNameIs) {
    return res.status(200).json({ msg: "Request received with desired key", reqBody: req.body });
  } else {
    return res.status(400).json({ msg: "Bad request! Maybe req.body is missing key prop!" });
  }
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

// check git hooks
