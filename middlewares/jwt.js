const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: {
        status: 401,
        message: "invalid JWT token",
      },
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        error: {
          status: 403,
          message: "invalid JWT token",
        },
      });
    }

    req.body.username = user.username;
    next();
  });
}

module.exports = authenticate;
