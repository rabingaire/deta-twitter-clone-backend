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

  return res.status(500).json({
    error: {
      status: 500,
      message: err.message,
    },
  });
}

module.exports = handleErrors;
