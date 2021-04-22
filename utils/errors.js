const { StatusCodes } = require("http-status-codes");

class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return StatusCodes.BAD_REQUEST;
    }

    if (this instanceof ForbiddenRequest) {
      return StatusCodes.FORBIDDEN;
    }

    if (this instanceof NotFound) {
      return StatusCodes.NOT_FOUND;
    }

    return StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

class BadRequest extends GeneralError {}
class ForbiddenRequest extends GeneralError {}
class NotFound extends GeneralError {}

module.exports = {
  GeneralError,
  BadRequest,
  ForbiddenRequest,
  NotFound,
};
