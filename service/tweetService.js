const db = require("../model/tweet");

const { ForbiddenRequest } = require("../utils/errors");
const { removeItem } = require("../utils/utils");
const { getFollowing } = require("./followingService");

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

async function getAllMyTweets(tweet) {
  const { username } = tweet;

  const response = await fetchTweets(username);
  return response;
}

async function getUserTweets(params) {
  const { userid } = params;

  const response = await fetchTweets(userid);
  return response;
}

async function fetchTweets(username) {
  const response = [];

  const tweets = db.tweets.fetch({ username });
  for await (const tweet of tweets) {
    response.push(...tweet);
  }

  return response;
}

async function fetchSingleTweet(username) {
  const { value } = await db.tweets.fetch({ username }).next();
  return value[0];
}

async function getMyTweetsFeed(user) {
  const { username } = user;

  const tweets = [];

  tweets.push(await fetchSingleTweet(username));

  const following = await getFollowing(username);
  const promises = following.usernames.map(async (username) => {
    return await fetchSingleTweet(username);
  });

  const followingTweets = await Promise.all(promises);
  tweets.push(...followingTweets);

  return tweets.map((tweet) => {
    const isLiked = tweet.likes.usernames.includes(username);
    return { ...tweet, likes: { ...tweet.likes, isLiked } };
  });
}

module.exports = {
  createTweet,
  likeTweet,
  unlikeTweet,
  getAllMyTweets,
  getUserTweets,
  getMyTweetsFeed,
};
