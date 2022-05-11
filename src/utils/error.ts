import { TBaseErrorData } from "~/types/system";
import { HttpStatusCode } from "~/utils/constants";

export class SimpleError extends Error {
  public readonly affectedResource: string;
  public readonly statusCode: HttpStatusCode;

  constructor({ message, affectedResource, statusCode }: TBaseErrorData) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.affectedResource = affectedResource;
    this.statusCode = statusCode;
  }
}
