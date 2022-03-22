import express from "express";

import {
  readBAccount,
  generateOneTransaction,
  createBAccount,
  deleteBAccount,
  populateDB,
  simulateSalaryEarning
} from "../controller";

const bankAccountRouter = express.Router();

bankAccountRouter.post("/", createBAccount);
bankAccountRouter.get("/:bAccountIDHere", readBAccount);
bankAccountRouter.delete("/:bAccountIDHere", deleteBAccount);

bankAccountRouter.post("/:bAccountIDHere/transact", generateOneTransaction);
bankAccountRouter.post("/:bAccountIDHere/salary", simulateSalaryEarning);

// --- Admin workBAcc and spendBAcc ---

bankAccountRouter.post("/admin", populateDB);

export { bankAccountRouter };
