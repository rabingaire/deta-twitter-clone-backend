const db = require("../model/user");

const { BadRequest } = require("../utils/errors");

const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function createUser(user) {
  const { username, password } = user;

  const userdata = await db.users.get(username);

  if (userdata) {
    throw new BadRequest("user already exists");
  }

  const encyptPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("base64");

  const insertedUser = await db.users.put({
    username,
    password: encyptPassword,
    key: username,
  });

  return insertedUser;
}

async function loginUser(user) {
  const { username, password } = user;

  const userdata = await db.users.get(username);

  if (!userdata) {
    throw new BadRequest("username or password does not match");
  }

  const encyptPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("base64");

  if (userdata.password !== encyptPassword) {
    throw new BadRequest("username or password does not match");
  }

  const accessToken = jwt.sign({ username }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: 3600,
  });

  return {
    accessToken,
  };
}

module.exports = {
  createUser,
  loginUser,
};
