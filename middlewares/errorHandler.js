const { StatusCodes } = require("http-status-codes");

const { GeneralError } = require("../utils/errors");

function handleErrors(err, req, res, next) {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      error: {
        status: err.getCode(),
        message: err.message,
      },
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message,
    },
  });
}

module.exports = handleErrors;
