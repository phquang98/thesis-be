import { getRepository } from "typeorm";

import { BankAccount, FinTransaction } from "../entity";
import { TFinTransactionRequestHandler } from "../types";
import { generateFinTransaction, HTTPStatusCode } from "../util";

// NOTE: WHERE OR -> pass an array or perform a QueryBuilder
export const readBalanceSheetByIndividual: TFinTransactionRequestHandler = async (req, res, _next) => {
  const { bAccIdHere } = req.params;

  try {
    if (bAccIdHere) {
      const suspectClt = await getRepository(FinTransaction).find({
        where: [{ sender_baccid: bAccIdHere }, { receiver_baccid: bAccIdHere }]
      });
      if (suspectClt.length === 0) {
        return res.status(HTTPStatusCode.NOT_FOUND).json({
          statusCode: HTTPStatusCode.NOT_FOUND,
          msg: "Failed to get one 1: not found",
          affectedResource: "FinTransaction",
          serverData: suspectClt
        });
      }
      return res.status(HTTPStatusCode.OK).json({
        statusCode: HTTPStatusCode.OK,
        msg: "Got",
        affectedResource: "FinTransaction",
        serverData: suspectClt
      });
    }
    return res.status(HTTPStatusCode.BAD_REQUEST).json({
      statusCode: HTTPStatusCode.BAD_REQUEST,
      msg: "Failed to get one 2: params missing or malformed",
      affectedResource: "FinTransaction",
      serverData: {}
    });
  } catch (error) {
    console.log("error", error);
    return res.status(HTTPStatusCode.BAD_REQUEST).json({
      statusCode: HTTPStatusCode.BAD_REQUEST,
      msg: "Failed to get one 3: bad req",
      affectedResource: "FinTransaction",
      serverData: {}
    });
  }
};

export const generateOneTransaction: TFinTransactionRequestHandler = async (req, res, _next) => {
  const { clientData } = req.body;
  const { sender_baccid, receiver_baccid, amount } = clientData;

  try {
    // if self send money or bank send money
    if (req.params.bAccIdHere === clientData.sender_baccid || clientData.sender_baccid === "1") {
      const senderDeduct = await getRepository(BankAccount).findOne({ id: sender_baccid });
      const receiverAdd = await getRepository(BankAccount).findOne({ id: receiver_baccid });
      console.log("cac", clientData);
      if (senderDeduct && receiverAdd && senderDeduct.balance >= amount) {
        const tmpData = generateFinTransaction(sender_baccid, receiver_baccid, amount);
        const tmpInstnc = getRepository(FinTransaction).create(tmpData);

        // const queryResult = await getRepository(BankAccount).save({
        //   ...senderDeduct,
        //   balance: senderDeduct.balance - amount
        // });
        await getRepository(BankAccount).save({ ...receiverAdd, balance: receiverAdd.balance + amount });
        await getRepository(FinTransaction).save(tmpInstnc);

        return res.status(HTTPStatusCode.CREATED).json({
          statusCode: HTTPStatusCode.CREATED,
          msg: "Posted!",
          affectedResource: "BankAccount, FinTransaction",
          serverData: {}
        });
      }
      return res.status(HTTPStatusCode.BAD_REQUEST).json({
        statusCode: HTTPStatusCode.BAD_REQUEST,
        msg: "Failed to post 1: balance not enough or sender/receiver not existed",
        affectedResource: "BankAccount, FinTransaction",
        serverData: {}
      });
    }
    return res.status(HTTPStatusCode.BAD_REQUEST).json({
      statusCode: HTTPStatusCode.BAD_REQUEST,
      msg: "Failed to post 2: params or body missing or malformed",
      affectedResource: "BankAccount, FinTransaction",
      serverData: {}
    });
  } catch (error) {
    return res.status(HTTPStatusCode.BAD_REQUEST).json({
      statusCode: HTTPStatusCode.BAD_REQUEST,
      msg: "Failed to post 3: bad req",
      affectedResource: "BankAccount, FinTransaction",
      serverData: {}
    });
  }
};
