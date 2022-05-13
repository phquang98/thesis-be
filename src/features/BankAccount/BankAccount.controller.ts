import { bAccRepo } from "~/features/BankAccount/BankAccount.repository";
import { uInfoRepo } from "~/features/UserInfo/UserInfo.repository";
import { TBAccRequestHandler } from "~/types/business";
import { HttpStatusCode, SimpleError } from "~/utils";

const affectedResource = "Bank Account";

// NOTE: can this be simplify
// check id existed in UInfo -> check id existed in BAcc -> no (only 1) -> else yes
export const createBAccCtr: TBAccRequestHandler = async (req, res, next) => {
  const { clientData } = req.body;

  try {
    const { userId } = clientData;
    const isQualified = await uInfoRepo.findOneRecordById(userId);
    if (isQualified) {
      const suspect = await bAccRepo.findOneRecordByUserId(clientData.userId);
      if (suspect) {
        return next(
          new SimpleError({
            message: "An User can only have one Bank Account!",
            affectedResource,
            statusCode: HttpStatusCode.BAD_REQUEST
          })
        );
      }
      const queryResult = await bAccRepo.createAndSaveOneRecord(clientData.userId);
      return res.status(HttpStatusCode.CREATED).json({
        message: "Bank Account created!",
        affectedResource,
        statusCode: HttpStatusCode.CREATED,
        serverData: queryResult
      });
    }
    return next(
      new SimpleError({
        message: "Failed create: Provided ID does not existed in the DB!",
        affectedResource,
        statusCode: HttpStatusCode.BAD_REQUEST
      })
    );
  } catch (error) {
    return next(
      new SimpleError({
        message: "Something wrong!",
        affectedResource,
        statusCode: HttpStatusCode.BAD_REQUEST
      })
    );
  }
};

export const readBAccCtr: TBAccRequestHandler = async (req, res, next) => {
  const { bAccIdHere } = req.params;

  try {
    const suspect = await bAccRepo.findOneRecordById(bAccIdHere);
    if (suspect) {
      return res.status(HttpStatusCode.OK).json({
        message: "Bank Account got!",
        affectedResource,
        statusCode: HttpStatusCode.OK,
        serverData: suspect
      });
    }
    return next(
      new SimpleError({
        message: "Failed get 1: Can't found record in DB based on provided id!",
        affectedResource,
        statusCode: HttpStatusCode.BAD_REQUEST
      })
    );
  } catch (error) {
    return next(
      new SimpleError({
        message: "Something wrong!",
        affectedResource,
        statusCode: HttpStatusCode.BAD_REQUEST
      })
    );
  }
};

export const deleteBAccCtr: TBAccRequestHandler = async (req, res, next) => {
  const { bAccIdHere } = req.params;

  try {
    const suspect = await bAccRepo.findOneRecordById(bAccIdHere);

    if (suspect) {
      const queryResult = await bAccRepo.deleteOneRecord(suspect);
      return res.status(HttpStatusCode.OK).json({
        message: "Bank Account deleted!",
        affectedResource,
        statusCode: HttpStatusCode.OK,
        serverData: queryResult
      });
    }
    return next(
      new SimpleError({
        message: "Failed delete 1: Can't found record in DB based on provided id!",
        affectedResource,
        statusCode: HttpStatusCode.BAD_REQUEST
      })
    );
  } catch (error) {
    return next(
      new SimpleError({
        message: "Something wrong!",
        affectedResource,
        statusCode: HttpStatusCode.BAD_REQUEST
      })
    );
  }
};

// --- Populate ---

// TODO: move this to /migration instead
export const populate: TBAccRequestHandler = async (req, res, next) => {
  try {
    await bAccRepo.simplePopulate();
    return res.status(HttpStatusCode.CREATED).json({
      message: "Populate OK! A working account and a spending account is created!",
      affectedResource,
      statusCode: HttpStatusCode.CREATED,
      serverData: {}
    });
  } catch (error) {
    return next(
      new SimpleError({
        message: "Something wrong!",
        affectedResource,
        statusCode: HttpStatusCode.BAD_REQUEST
      })
    );
  }
};
