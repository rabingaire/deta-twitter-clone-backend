const { Router } = require("express");

const {
  userauthValidator,
  editUserValidator,
  followUserValidator,
} = require("../validators/userValidator");
const authenticate = require("../middlewares/jwt");
const userController = require("../controller/users");

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

// POST: /api/v1/users/unfollow
router.post(
  "/unfollow",
  followUserValidator,
  authenticate,
  userController.unfollow
);

// GET: /api/v1/users/myprofile
router.get("/myprofile", authenticate, userController.myprofile);

// GET: /api/v1/users/:userid
router.get("/:userid", authenticate, userController.getUserProfile);

module.exports = router;
