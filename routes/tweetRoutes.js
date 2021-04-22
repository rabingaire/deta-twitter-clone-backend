const { Router } = require("express");

const {
  tweetCreateValidator,
  tweetActionValidator,
} = require("../validators/tweetValidator");
const authenticate = require("../middlewares/jwt");
const tweetController = require("../controller/tweets");

const router = Router();

// POST: /api/v1/tweets/create
router.post(
  "/create",
  tweetCreateValidator,
  authenticate,
  tweetController.create
);

// POST: /api/v1/tweets/like
router.post("/like", tweetActionValidator, authenticate, tweetController.like);

// POST: /api/v1/tweets/unlike
router.post(
  "/unlike",
  tweetActionValidator,
  authenticate,
  tweetController.unlike
);

// GET: /api/v1/tweets/mytweets
router.get("/mytweets", authenticate, tweetController.getAllMyTweets);

// GET: /api/v1/tweets/myfeed
router.get("/myfeed", authenticate, tweetController.getMyTweetsFeed);

// GET: /api/v1/tweets/:userid
router.get("/:userid", authenticate, tweetController.getUserTweets);

module.exports = router;
