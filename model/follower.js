const deta = require("../database");

const followers = deta.Base("followers");

module.exports = {
  followers,
};
