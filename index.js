require("./env");

const { app } = require("./app");
const handleErrors = require("./middlewares/errorHandler");
const routers = require("./routes");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1", routers);

app.use(handleErrors);

module.exports = app;
