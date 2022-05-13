import { ObjectSchema } from "joi";
import { TUInfoRequestHandler } from "~/types/business";
import { HttpStatusCode, SimpleError } from "~/utils";

// NOTE: should pass Joi error.message to the SimpleError constructor

export const validateUInfo = (clientSchemaHere: ObjectSchema): TUInfoRequestHandler => {
  const ctrFoo: TUInfoRequestHandler = async (req, _res, next) => {
    const { clientData } = req.body;

    try {
      const reqBodyData = await clientSchemaHere.validateAsync(clientData);
      if (reqBodyData) {
        next();
      }
    } catch (error) {
      return next(
        new SimpleError({
          message: "Data is corrupted!",
          affectedResource: "Validate Middleware",
          statusCode: HttpStatusCode.BAD_REQUEST
        })
      );
    }
  };
  return ctrFoo;
};
