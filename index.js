require("./env");
const { app } = require("./app");
const routers = require("./routes");
const handleErrors = require("./middlewares/errorHandler");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1", routers);

app.use(handleErrors);

module.exports = app;
