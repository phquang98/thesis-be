import express from "express";

const resourceRouter = express.Router();

resourceRouter.get("/", (req, res, _next) => {
  return res.status(200).json({ data: "resource here" });
});

export { resourceRouter };
