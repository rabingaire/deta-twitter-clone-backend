const { Router } = require("express");

const { tweetValidator } = require("../validators/tweetValidator");
const tweetController = require("../controller/tweets");
const authenticate = require("../middlewares/jwt");

const router = Router();

// POST: /api/v1/tweets/create
router.post("/create", tweetValidator, authenticate, tweetController.create);

// // POST: /api/v1/users/edit
// router.patch("/edit", editUserValidator, authenticate, userController.edit);

module.exports = router;
