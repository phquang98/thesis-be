import express from "express";

import {
  readBAccount,
  generateOneTransaction,
  createBAccount,
  deleteBAccount,
  populateDB,
  simulateSalaryEarning
} from "../controller";
import { checkReqParams, bAccReqBodyMddlwr } from "../middleware/custom_validation.middleware";

const bankAccountRouter = express.Router();

bankAccountRouter.post("/", createBAccount);
bankAccountRouter.get("/:bAccountIDHere", readBAccount);
bankAccountRouter.delete("/:bAccountIDHere", deleteBAccount);

bankAccountRouter.post(
  "/:bAccountIDHere/transact",
  [checkReqParams, bAccReqBodyMddlwr(["sender_baccid", "receiver_baccid", "amount"])],
  generateOneTransaction
);
bankAccountRouter.post("/:bAccountIDHere/salary", simulateSalaryEarning);

// --- Admin workBAcc and spendBAcc ---

bankAccountRouter.post("/admin", populateDB);

export { bankAccountRouter };
