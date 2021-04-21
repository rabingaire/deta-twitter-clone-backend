const express = require("express");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// For local development
if (!process.env.DETA_RUNTIME) {
  app.listen(3000, () => {
    console.log("App listening at http://localhost:3000");
  });
}

exports.app = app;
