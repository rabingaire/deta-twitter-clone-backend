const db = require("../model/user");

const { BadRequest } = require("../utils/errors");

const crypto = require("crypto");

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
module.exports = {
  createUser,
};
