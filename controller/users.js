const { StatusCodes } = require("http-status-codes");

const userService = require("../service/userService");

function create(req, res, next) {
  userService
    .createUser(req.body)
    .then((data) => res.status(StatusCodes.CREATED).json({ data }))
    .catch((err) => next(err));
}

function login(req, res, next) {
  userService
    .loginUser(req.body)
    .then((data) => res.status(StatusCodes.OK).json({ data }))
    .catch((err) => next(err));
}

function edit(req, res, next) {
  userService
    .editUser(req.body)
    .then((data) => res.status(StatusCodes.OK).json({ data }))
    .catch((err) => next(err));
}

module.exports = {
  create,
  login,
  edit,
};
