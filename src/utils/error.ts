import { TBaseErrorData } from "~/types/system";

export class BaseError extends Error {
  public readonly statusCode: number;

  constructor({ message, statusCode }: TBaseErrorData) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.statusCode = statusCode;
  }
}
