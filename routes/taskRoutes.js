const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  addTask,
  getUserTasks,
  getTaskById,
} = require("../controllers/taskController");

router.route("/").post(auth, addTask).get(auth, getUserTasks);

router.route("/:id").get(auth, getTaskById);

module.exports = router;
