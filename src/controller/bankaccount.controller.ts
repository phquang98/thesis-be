import { getRepository } from "typeorm";

import { bAccRequestHandler } from "../util/index.util";
import { BankAccount, FinTransaction } from "../entity";
import { generateBankAccountData, generateOneTransactionData } from "../util/helper";

export const createBAccount: bAccRequestHandler = async (req, res, _next) => {
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

export const readBAccount: bAccRequestHandler = async (req, res, _next) => {
  const { bAccountIDHere } = req.params;

  try {
    if (bAccountIDHere && bAccountIDHere !== "") {
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

export const deleteBAccount: bAccRequestHandler = async (req, res, _next) => {
  const { bAccountIDHere } = req.params;

  try {
    if (bAccountIDHere && bAccountIDHere !== "") {
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

export const generateOneTransaction: bAccRequestHandler = async (req, res, _next) => {
  const { clientData } = req.body;

  try {
    if ("senderBAccID" in clientData && req.params.bAccountIDHere === clientData.senderBAccID) {
      const { senderBAccID, receiverBAccID, amount } = clientData;

      const senderDeduct = await getRepository(BankAccount).findOne({ id: senderBAccID });
      const receiverAdd = await getRepository(BankAccount).findOne({ id: receiverBAccID });
      if (senderDeduct && receiverAdd && senderDeduct.balance >= amount) {
        const tmpData = generateOneTransactionData(senderBAccID, receiverBAccID, amount);
        const tmpInstnc = getRepository(FinTransaction).create(tmpData);

        await getRepository(BankAccount).save({ ...senderDeduct, balance: senderDeduct.balance - amount });
        await getRepository(BankAccount).save({ ...receiverAdd, balance: receiverAdd.balance + amount });
        const queryResult = await getRepository(FinTransaction).save(tmpInstnc);
        return res
          .status(201)
          .json({ msg: "Posted!", affectedResource: "BankAccount, Transaction", serverData: queryResult });
      }
      return res.status(400).json({
        msg: "Failed to post 1: balance not enough or sender/receiver not existed",
        affectedResource: "BankAccount, Transaction"
      });
    }
    return res.status(400).json({
      msg: "Failed to post 2: params or body missing or malformed",
      affectedResource: "BankAccount, Transaction"
    });
  } catch (error) {
    return res.status(400).json({ msg: "Failed to post 3: bad req", affectedResource: "BankAccount, Transaction" });
  }
};

export const simulateCashDeposit: bAccRequestHandler = async (req, res, _next) => {
  const { bAccountIDHere } = req.params;
  const { clientData } = req.body;

  try {
    if ("depositBAccID" in clientData && req.params.bAccountIDHere === clientData.depositBAccID) {
      const { depositAmount } = clientData;

      const suspect = await getRepository(BankAccount).findOne({ id: bAccountIDHere });

      if (suspect) {
        const tmpInstnc = getRepository(BankAccount).create({ ...suspect, balance: depositAmount });
        const queryRes = await getRepository(BankAccount).save(tmpInstnc);
        return res.status(200).json({ msg: "Updated!", affectedResource: "BankAccount", serverData: queryRes });
      }
      return res.status(404).json({ msg: "Failed to post 1: not found", affectedResource: "BankAccount" });
    }
    return res
      .status(400)
      .json({ msg: "Failed to post 2: params and body missing or malformed", affectedResource: "BankAccount" });
  } catch (error) {
    return res.status(400).json({ msg: "Failed to post 3: bad req", affectedResource: "BankAccount" });
  }
};
