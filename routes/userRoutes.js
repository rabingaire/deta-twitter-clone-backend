const { Router } = require("express");

const {
  userauthValidator,
  editUserValidator,
  followUserValidator,
} = require("../validators/userValidator");
const userController = require("../controller/users");
const authenticate = require("../middlewares/jwt");

const router = Router();

// POST: /api/v1/users/signup
router.post("/signup", userauthValidator, userController.create);

// POST: /api/v1/users/login
router.post("/login", userauthValidator, userController.login);

// POST: /api/v1/users/edit
router.patch("/edit", editUserValidator, authenticate, userController.edit);

// POST: /api/v1/users/follow
router.post(
  "/follow",
  followUserValidator,
  authenticate,
  userController.follow
);

module.exports = router;
