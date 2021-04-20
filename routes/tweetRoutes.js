const { Router } = require("express");

const {
  tweetCreateValidator,
  tweetActionValidator,
} = require("../validators/tweetValidator");
const tweetController = require("../controller/tweets");
const authenticate = require("../middlewares/jwt");

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

module.exports = router;
