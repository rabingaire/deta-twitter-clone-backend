const { StatusCodes } = require("http-status-codes");

const tweetService = require("../service/tweetService");

function create(req, res, next) {
  tweetService
    .createTweet(req.body)
    .then((data) => res.status(StatusCodes.CREATED).json({ data }))
    .catch((err) => next(err));
}

function like(req, res, next) {
  tweetService
    .likeTweet(req.body)
    .then((data) => res.status(StatusCodes.OK).json({ data }))
    .catch((err) => next(err));
}

function unlike(req, res, next) {
  tweetService
    .unlikeTweet(req.body)
    .then((data) => res.status(StatusCodes.OK).json({ data }))
    .catch((err) => next(err));
}

function getAllMyTweets(req, res, next) {
  tweetService
    .getAllMyTweets(req.body)
    .then((data) => res.status(StatusCodes.OK).json({ data }))
    .catch((err) => next(err));
}

function getUserTweets(req, res, next) {
  tweetService
    .getUserTweets(req.params)
    .then((data) => res.status(StatusCodes.OK).json({ data }))
    .catch((err) => next(err));
}

module.exports = {
  create,
  like,
  unlike,
  getAllMyTweets,
  getUserTweets,
};
