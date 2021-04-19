const deta = require("../database");

const users = deta.Base("users");

module.exports = {
  users,
};
