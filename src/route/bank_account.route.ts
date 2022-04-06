import express from "express";

import {
  readBAccount,
  generateOneTransaction,
  createBAccount,
  deleteBAccount,
  populateDB,
  simulateSalaryEarning
} from "../controller";
import { checkReqParamsMddlwr, checkReqBodyMddlwr } from "../middleware";

const bankAccountRouter = express.Router();

bankAccountRouter.post("/", createBAccount);
bankAccountRouter.get("/:bAccountIDHere", readBAccount);
bankAccountRouter.delete("/:bAccountIDHere", deleteBAccount);

bankAccountRouter.post(
  "/:bAccountIDHere/transact",
  [checkReqParamsMddlwr, checkReqBodyMddlwr(["sender_baccid", "receiver_baccid", "amount"])],
  generateOneTransaction
);
bankAccountRouter.post("/:bAccountIDHere/salary", simulateSalaryEarning);

// --- Admin workBAcc and spendBAcc ---

bankAccountRouter.post("/admin", populateDB);

export { bankAccountRouter };
