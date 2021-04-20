const db = require("../model/tweet");

const { ForbiddenRequest } = require("../utils/errors");

async function createTweet(tweet) {
  const { username, body } = tweet;

  const data = {
    username,
    body,
    retweets: 0,
    likes: { count: 0, usernames: [] },
  };

  const res = await db.tweets.put(data);

  return res;
}

async function likeTweet(tweet) {
  const { username, id } = tweet;

  const tweetdata = await db.tweets.get(id);
  if (!tweetdata) {
    throw new ForbiddenRequest(
      "forbidden error can't process following request"
    );
  }

  if (tweetdata.likes.usernames.includes(username)) {
    throw new ForbiddenRequest(
      "forbidden error can't process following request"
    );
  }

  const likes = {
    count: tweetdata.likes.count + 1,
    usernames: [...tweetdata.likes.usernames, username],
  };

  await db.tweets.update({ likes }, id);

  return { ...tweetdata, likes: likes };
}

async function unlikeTweet(tweet) {
  function removeItem(arr, value) {
    return arr.filter((val) => val !== value);
  }

  const { username, id } = tweet;

  const tweetdata = await db.tweets.get(id);
  if (!tweetdata) {
    throw new ForbiddenRequest(
      "forbidden error can't process following request"
    );
  }

  if (!tweetdata.likes.usernames.includes(username)) {
    throw new ForbiddenRequest(
      "forbidden error can't process following request"
    );
  }

  const usernames = removeItem(tweetdata.likes.usernames, username);

  const likes = {
    count: tweetdata.likes.count - 1,
    usernames,
  };

  await db.tweets.update(
    { "likes.count": likes.count, "likes.usernames": usernames },
    id
  );

  return { ...tweetdata, likes: likes };
}

async function getAllTweets(tweet) {
  const { username } = tweet;

  const response = [];

  const tweets = db.tweets.fetch({ username });
  for await (const tweet of tweets) {
    response.push(...tweet);
  }

  return response;
}

module.exports = {
  createTweet,
  likeTweet,
  unlikeTweet,
  getAllTweets,
};
