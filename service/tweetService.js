const db = require("../model/tweet");

async function createTweet(tweet) {
  const { username, body } = tweet;

  const data = {
    username,
    body,
    retweets: 0,
    likes: 0,
  };

  await db.tweets.put(data);

  return data;
}

module.exports = {
  createTweet,
};
