import { getRepository } from "typeorm";

import { xRequestHandler } from "../util/index.util";
import { BankAccount, FinTransaction } from "../entity";
import { generateBankAccountData, generateOneTransactionData } from "../util/helper";

export const createBAccount: xRequestHandler = async (req, res, _next) => {
  const { clientData } = req.body;

  try {
    if (clientData && "customerID" in clientData) {
      const suspect = await getRepository(BankAccount).findOne({ customerID: clientData.customerID });
      if (suspect) {
        return res
          .status(400)
          .json({ msg: "Failed to create 1: atm cant only have 1 account", affectedResource: "BankAccount" });
      }
      const tmpData = generateBankAccountData(clientData.customerID);
      const tmpInstnc = getRepository(BankAccount).create(tmpData);
      const queryResult = await getRepository(BankAccount).save(tmpInstnc);
      return res.status(201).json({ msg: "Created", affectedResource: "BankAccount", serverData: queryResult });
    }
    return res
      .status(400)
      .json({ msg: "Failed to create 2: req body missing/malformed", affectedResource: "BankAccount" });
  } catch (error) {
    return res.status(400).json({ msg: "Failed to create 3: bad req", affectedResource: "BankAccount" });
  }
};

export const readBAccount: xRequestHandler = async (req, res, _next) => {
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

export const deleteBAccount: xRequestHandler = async (req, res, _next) => {
  try {
    if ("bAccountIDHere" in req.params) {
      const { bAccountIDHere } = req.params;
      const suspect = await getRepository(BankAccount).findOne({ id: bAccountIDHere });

      if (suspect) {
        const queryResult = await getRepository(BankAccount).remove(suspect); // queryResult miss id prop
        return res.status(200).json({ msg: "Deleted one", affectedResource: "BankAccount", serverData: queryResult });
      }
      return res.status(404).json({ msg: "Failed to deleted 1: not found", affectedResource: "BankAccount" });
    }
    return res
      .status(400)
      .json({ msg: "Failed to delete 2: path params missing or malformed", affectedResource: "BankAccount" });
  } catch (error) {
    return res.status(400).json({ msg: "Failed to get: bad req", affectedResource: "BankAccount" });
  }
};

export const generateOneTransaction: xRequestHandler = async (req, res, _next) => {
  const { clientData } = req.body;
  console.log("log", { asd: clientData, dsa: req.params });

  try {
    if (
      "bAccountIDHere" in req.params &&
      "senderBAccID" in clientData &&
      req.params.bAccountIDHere === clientData.senderBAccID
    ) {
      const { senderBAccID, receiverBAccID, amount } = clientData;

      const tmpData = generateOneTransactionData(senderBAccID, receiverBAccID, amount);
      const tmpInstnc = getRepository(FinTransaction).create(tmpData);
      const queryResult = await getRepository(FinTransaction).save(tmpInstnc);
      return res
        .status(201)
        .json({ msg: "Posted!", affectedResource: "BankAccount, Transaction", serverData: queryResult });
    }
    return res.status(400).json({
      msg: "Failed to post 2: params or body missing or malformed",
      affectedResource: "BankAccount, Transaction"
    });
  } catch (error) {
    return res.status(400).json({ msg: "Failed to post 3: bad req", affectedResource: "BankAccount, Transaction" });
  }
};

export const simulateCashDeposit: xRequestHandler = async (req, res, _next) => {
  console.log("generateOneTransaction called");
};
