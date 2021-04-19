const { Router } = require("express");

const { userValidator } = require("../validators/userValidator");
const userController = require("../controller/users");

const router = Router();

// POST: /api/v1/users
router.post("/", userValidator, userController.create);

module.exports = router;
