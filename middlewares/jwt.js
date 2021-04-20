const jwt = require("jsonwebtoken");
const db = require("../model/user");

function authenticate(req, res, next) {
  const authHeader = req.get("X-Authorization");

  if (!authHeader) {
    return res.status(401).json({
      error: {
        status: 401,
        message: "invalid JWT token",
      },
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({
        error: {
          status: 403,
          message: "invalid JWT token",
        },
      });
    }

    const userdata = await db.users.get(user.username);
    if (!userdata) {
      return res.status(403).json({
        error: {
          status: 403,
          message: "forbidden error can't process the request",
        },
      });
    }

    req.body.username = user.username;
    next();
  });
}

module.exports = authenticate;
