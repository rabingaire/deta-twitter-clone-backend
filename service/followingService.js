const db = require("../model/following");
const { removeItem } = require("../utils/utils");
const { ForbiddenRequest } = require("../utils/errors");

async function followUser(user) {
  const { username, id } = user;

  if (username === id) {
    throw new ForbiddenRequest(
      "forbidden error can't process following request"
    );
  }

  const followingdata = await db.following.get(username);
  if (!followingdata) {
    await db.following.put(
      {
        count: 1,
        usernames: [id],
      },
      username
    );

    return {
      message: "operation successful",
    };
  }

  if (followingdata.usernames.includes(id)) {
    throw new ForbiddenRequest(
      "forbidden error can't process following request"
    );
  }

  await db.following.update(
    {
      count: followingdata.count + 1,
      usernames: [...followingdata.usernames, id],
    },
    username
  );

  return {
    message: "operation successful",
  };
}

async function unfollowUser(user) {
  const { username, id } = user;

  if (username === id) {
    throw new ForbiddenRequest(
      "forbidden error can't process following request"
    );
  }

  const followingdata = await db.following.get(username);
  if (!followingdata) {
    throw new ForbiddenRequest(
      "forbidden error can't process following request"
    );
  }

  if (!followingdata.usernames.includes(id)) {
    throw new ForbiddenRequest(
      "forbidden error can't process following request"
    );
  }

  const usernames = removeItem(followingdata.usernames, id);

  await db.following.update(
    {
      count: followingdata.count - 1,
      usernames,
    },
    username
  );

  return {
    message: "operation successful",
  };
}

async function getFollowing(username) {
  const data = await db.following.get(username);
  if (!data) {
    return {
      count: 0,
      usernames: [],
    };
  }
  delete data.key;

  return data;
}

module.exports = {
  followUser,
  unfollowUser,
  getFollowing,
};
