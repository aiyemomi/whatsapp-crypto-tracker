require("dotenv").config();
const express = require("express");

const app = express();

const run_app = require("./src/services/runApp.js");

const connectDB = require("./src/config/db.js");

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    run_app();
  })
  .catch((error) => console.log("error connecting to database", error));

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
