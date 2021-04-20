const { StatusCodes } = require("http-status-codes");

const tweetService = require("../service/tweetService");

function create(req, res, next) {
  tweetService
    .createTweet(req.body)
    .then((data) => res.status(StatusCodes.CREATED).json({ data }))
    .catch((err) => next(err));
}

// function edit(req, res, next) {
//   userService
//     .editUser(req.body)
//     .then((data) => res.status(StatusCodes.OK).json({ data }))
//     .catch((err) => next(err));
// }

module.exports = {
  create,
};
