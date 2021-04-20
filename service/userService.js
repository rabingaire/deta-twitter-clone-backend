const db = require("../model/user");

const { BadRequest, ForbiddenRequest } = require("../utils/errors");

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

  await db.users.put({
    username,
    password: encyptPassword,
    key: username,
    description: "",
    followers: 0,
    following: 0,
  });

  return {
    username,
  };
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

async function editUser(user) {
  const { username, description } = user;

  const userdata = await db.users.get(username);

  if (!userdata) {
    throw new ForbiddenRequest("forbidden error can't process the request");
  }

  await db.users.update(
    {
      description,
    },
    username
  );

  return {
    description,
  };
}

module.exports = {
  createUser,
  loginUser,
  editUser,
};
