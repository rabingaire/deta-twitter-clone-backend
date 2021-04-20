const { Router } = require("express");

const router = Router();

const userRoutes = require("./routes/userRoutes");
const tweetRoutes = require("./routes/tweetRoutes");

router.use("/users", userRoutes);
router.use("/tweets", tweetRoutes);

module.exports = router;
