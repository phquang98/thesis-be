import { bAccRepo } from "~/features/BankAccount/BankAccount.repository";
import { finTransactRepo } from "~/features/FinTransaction/FinTransaction.repository";
import { TFinTransactionRequestHandler } from "~/types/business";
import { SimpleError, HttpStatusCode, isExceed } from "~/utils";

const affectedResource = "Financial Transaction";

export const readOneFinTransactCtr: TFinTransactionRequestHandler = async (req, res, next) => {
  const { finTransactIdHere } = req.params;

  try {
    const suspect = await finTransactRepo.findOneRecordById(finTransactIdHere);
    if (suspect) {
      return res.status(HttpStatusCode.OK).json({
        message: "Found one!",
        affectedResource,
        statusCode: HttpStatusCode.OK,
        serverData: suspect
      });
    }
    return next(
      new SimpleError({
        message: "Failed get 1: Can't found record in DB based on provided id!",
        affectedResource,
        statusCode: HttpStatusCode.NOT_FOUND
      })
    );
  } catch (error) {
    return next(
      new SimpleError({
        message: "Failed get 2: Something wrong!",
        affectedResource,
        statusCode: HttpStatusCode.BAD_REQUEST
      })
    );
  }
};

// TODO: test this
export const readBankStatementCtr: TFinTransactionRequestHandler = async (req, res, next) => {
  const { clientData } = req.body;

  try {
    if ("bAccIdHere" in clientData) {
      const { bAccIdHere } = clientData;

      const senderClt = await finTransactRepo.findAllRecordsBySender(bAccIdHere);
      const receiverClt = await finTransactRepo.findAllRecordsByReceiver(bAccIdHere);

      return res.status(HttpStatusCode.OK).json({
        message: "Created a bank statement!",
        affectedResource,
        statusCode: HttpStatusCode.OK,
        serverData: {
          ...senderClt,
          ...receiverClt
        }
      });
    }
    return new SimpleError({
      message: "Failed get: Can't make a bank statement. Bank Account ID is probably missing!",
      affectedResource,
      statusCode: HttpStatusCode.BAD_REQUEST
    });
  } catch (error) {
    return next(
      new SimpleError({
        message: "Failed get: Something wrong!",
        affectedResource,
        statusCode: HttpStatusCode.BAD_REQUEST
      })
    );
  }
};

// NOTE: can this be simplify
// TODO: test this
// amount, sender, receiver -> type narrow -> sender receiver must exist -> sender enough money -> OK
export const createOneFinTransactCtr: TFinTransactionRequestHandler = async (req, res, next) => {
  const { clientData } = req.body;

  try {
    if ("amount" in clientData) {
      const { amount, senderBAccId, receiverBAccId } = clientData;

      const sender = await bAccRepo.findOneRecordById(senderBAccId);
      const receiver = await bAccRepo.findOneRecordById(receiverBAccId);

      if (sender && receiver) {
        if (isExceed(sender, amount)) {
          await bAccRepo.deductFundsToOneBAcc(sender, amount);
          await bAccRepo.addFundsToOneBAcc(receiver, amount);
          const queryResult = await finTransactRepo.createAndSaveOneRecord(clientData);
          return res.status(HttpStatusCode.CREATED).json({
            message: "Created!",
            affectedResource,
            statusCode: HttpStatusCode.CREATED,
            serverData: queryResult
          });
        }
        return next(
          new SimpleError({
            message: "Failed post: Sender do not have sufficient balance to make a transaction!",
            affectedResource,
            statusCode: HttpStatusCode.BAD_REQUEST
          })
        );
      }
      return next(
        new SimpleError({
          message: "Failed post: Failed to find the sender and receiver!",
          affectedResource,
          statusCode: HttpStatusCode.BAD_REQUEST
        })
      );
    }

    return next(
      new SimpleError({
        message: "Failed post: Missing or malformed data in request's body!",
        affectedResource,
        statusCode: HttpStatusCode.BAD_REQUEST
      })
    );
  } catch (error) {
    return next(
      new SimpleError({
        message: "Failed get: Something wrong!",
        affectedResource,
        statusCode: HttpStatusCode.BAD_REQUEST
      })
    );
  }
};

// export const readSenderOnlyFinTransactCtr: TFinTransactionRequestHandler = async (req, res, next) => {
//   try {
//     // narrow param type here
//     // senderIdHere -> finTransactRepo.findAllRecordsBySender()
//   } catch (error) {
//     return next(
//       new SimpleError({
//         message: "Failed get 2: Something wrong!",
//         affectedResource,
//         statusCode: HttpStatusCode.BAD_REQUEST
//       })
//     );
//   }
// };

// export const readReceiverOnlyFinTransactCtr: TFinTransactionRequestHandler = async (req, res, next) => {
//   try {
//     // narrow param type here
//     // receiverIdHere -> finTransactRepo.findAllRecordsByReceiver()
//   } catch (error) {
//     return next(
//       new SimpleError({
//         message: "Failed get 2: Something wrong!",
//         affectedResource,
//         statusCode: HttpStatusCode.BAD_REQUEST
//       })
//     );
//   }
// };
