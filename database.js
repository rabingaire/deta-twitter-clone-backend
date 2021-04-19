const { Deta } = require("deta");

const deta = Deta(process.env.DETA_PROJECT_KEY);

module.exports = deta;
