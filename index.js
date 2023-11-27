const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

require("dotenv").config();
require("./db/connect");
const port = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// health route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "SJI - Task Manager API is running",
  });
});

app.get("/", (req, res) => {
  res.send("Task Manager app is working!");
});

app.listen(port, () => {
  console.log(`Task Manager app listening on port ${port}`);
});
