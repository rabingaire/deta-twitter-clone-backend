const { Router } = require("express");

const { userValidator } = require("../validators/userValidator");
const userController = require("../controller/users");

const router = Router();

// POST: /api/v1/users/signup
router.post("/signup", userValidator, userController.create);

// POST: /api/v1/users/login
router.post("/login", userValidator, userController.login);

module.exports = router;
