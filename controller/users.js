const { StatusCodes } = require("http-status-codes");

const userService = require("../service/userService");

function create(req, res, next) {
  userService
    .createUser(req.body)
    .then((data) => res.status(StatusCodes.CREATED).json({ data }))
    .catch((err) => next(err));
}

module.exports = {
  create,
};
