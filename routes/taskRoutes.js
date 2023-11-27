const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const { addTask, getUserTasks } = require("../controllers/taskController");

router.route("/").post(auth, addTask).get(auth, getUserTasks);

module.exports = router;
