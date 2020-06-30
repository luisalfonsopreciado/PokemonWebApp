import {CustomError} from './custom-error'

export class NotAuthorizedError extends CustomError {
  reason = "Not Authorized";
  statusCode = 401;

  constructor() {
    super("Not Authorized");

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
