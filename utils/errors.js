class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    }

    if (this instanceof ForbiddenRequest) {
      return 403;
    }

    return 500;
  }
}

class BadRequest extends GeneralError {}
class ForbiddenRequest extends GeneralError {}

module.exports = {
  GeneralError,
  BadRequest,
  ForbiddenRequest,
};
