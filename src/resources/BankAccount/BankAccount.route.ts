import express from "express";

const bankAccountRouter = express.Router();

bankAccountRouter.post("/populate");

bankAccountRouter.post("/");
bankAccountRouter.get("/:bAccIdHere");
// bankAccountRouter.delete("/:bAccIdHere", deleteBAccount);

// --- Admin workBAcc and spendBAcc ---

export { bankAccountRouter };
