const db = require("../model/follower");

const { ForbiddenRequest } = require("../utils/errors");

async function followUser(user) {
  const { username, id } = user;

  if (username === id) {
    throw new ForbiddenRequest(
      "forbidden error can't process following request"
    );
  }

  const followerdata = await db.followers.get(id);
  if (!followerdata) {
    await db.followers.put(
      {
        count: 1,
        usernames: [username],
      },
      id
    );

    return {
      message: "operation successful",
    };
  }

  if (followerdata.usernames.includes(username)) {
    throw new ForbiddenRequest(
      "forbidden error can't process following request"
    );
  }

  await db.followers.update(
    {
      count: followerdata.count + 1,
      usernames: [...followerdata.usernames, username],
    },
    id
  );

  return {
    message: "operation successful",
  };
}

module.exports = {
  followUser,
};
