const deta = require("../database");

const following = deta.Base("following");

module.exports = {
  following,
};
