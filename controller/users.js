const { StatusCodes } = require("http-status-codes");

const userService = require("../service/userService");
const followingService = require("../service/followingService");
const followerService = require("../service/followerService");

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

function follow(req, res, next) {
  const following = followingService.followUser(req.body);

  const follower = followerService.followUser(req.body);

  Promise.all([following, follower])
    .then((data) => res.status(StatusCodes.OK).json({ data: data[0] }))
    .catch((err) => next(err));
}

module.exports = {
  create,
  login,
  edit,
  follow,
};
