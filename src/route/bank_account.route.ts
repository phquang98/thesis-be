import express from "express";

import { readBAccount, createBAccount, deleteBAccount, populateDB } from "../controller";

const bankAccountRouter = express.Router();

bankAccountRouter.post("/", createBAccount);
bankAccountRouter.get("/:bAccIdHere", readBAccount);
bankAccountRouter.delete("/:bAccIdHere", deleteBAccount);

// --- Admin workBAcc and spendBAcc ---

bankAccountRouter.post("/admin", populateDB);

export { bankAccountRouter };
