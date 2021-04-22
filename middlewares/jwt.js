const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const db = require("../model/user");

function authenticate(req, res, next) {
  const authHeader = req.get("X-Authorization");

  if (!authHeader) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: {
        status: StatusCodes.UNAUTHORIZED,
        message: "invalid JWT token",
      },
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: {
          status: StatusCodes.UNAUTHORIZED,
          message: "invalid JWT token",
        },
      });
    }

    const userdata = await db.users.get(user.username);
    if (!userdata) {
      return res.status(StatusCodes.FORBIDDEN).json({
        error: {
          status: StatusCodes.FORBIDDEN,
          message: "forbidden error can't process the request",
        },
      });
    }

    req.body.username = user.username;
    next();
  });
}

module.exports = authenticate;
