const deta = require("../database");

const tweets = deta.Base("tweets");

module.exports = {
  tweets,
};
