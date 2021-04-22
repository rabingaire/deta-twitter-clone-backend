const db = require("../model/user");

const { BadRequest, NotFound } = require("../utils/errors");
const { getFollowers } = require("./followerService");
const { getFollowing } = require("./followingService");

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
    accessToken: `Bearer ${accessToken}`,
  };
}

async function editUser(user) {
  const { username, description } = user;

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

async function myprofile(user) {
  const { username } = user;
  const userinfo = await getprofileInfo(username);
  return userinfo;
}

async function getUserProfile(params) {
  const { username, userid } = params;
  const userinfo = await getprofileInfo(userid);
  const isFollowing = userinfo.followers.usernames.includes(username);

  return { ...userinfo, isFollowing };
}

async function getprofileInfo(username) {
  const userdata = await db.users.get(username);
  if (!userdata) {
    throw new NotFound("user not found");
  }
  const followers = await getFollowers(username);
  const following = await getFollowing(username);

  return {
    id: userdata.key,
    username: userdata.username,
    description: userdata.description,
    followers,
    following,
  };
}

module.exports = {
  createUser,
  loginUser,
  editUser,
  myprofile,
  getUserProfile,
};
