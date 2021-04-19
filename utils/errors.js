class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    }
    return 500;
  }
}

class BadRequest extends GeneralError {}

module.exports = {
  GeneralError,
  BadRequest,
};
