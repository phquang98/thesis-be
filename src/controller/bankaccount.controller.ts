import { getRepository } from "typeorm";

import { xRequestHandler } from "../util/index.util";
import { BankAccount } from "../entity/bankaccount.entity";

export const readBankAccount: xRequestHandler = async (req, res, _next) => {
  try {
    if ("bAccountIDHere" in req.params) {
      const { bAccountIDHere } = req.params;
      const suspect = await getRepository(BankAccount).findOne({ id: bAccountIDHere });
      return suspect
        ? res.status(200).json({ msg: "Got one", affectedResource: "BankAccount", serverData: suspect })
        : res.status(404).json({ msg: "Failed to get one 1: not found", affectedResource: "BankAccount" });
    }
    return res.status(400).json({ msg: "Failed to get 2: params missing/malformed", affectedResource: "BankAccount" });
  } catch (error) {
    return res.status(400).json({ msg: "Failed to get 3: bad req", affectedResource: "BankAccount" });
  }
};

export const generateOneTransaction: xRequestHandler = async (req, res, _next) => {
  console.log("generateOneTransaction called");
};

export const simulateCashDeposit: xRequestHandler = async (req, res, _next) => {
  console.log("generateOneTransaction called");
};
