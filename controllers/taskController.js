const Task = require("../models/Task");
const asyncWrapper = require("../middlewares/asyncWrapper");

// add new Task
const addTask = asyncWrapper(async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  await task.save();
  res.status(201).json({ task, message: "Task created successfully" });
});

// get all Task
const getUserTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({
    owner: req.user._id,
  });

  res.status(200).json({
    tasks,
    count: tasks.length,
    message: "Tasks fetched successfully",
  });
});

module.exports = {
  addTask,
  getUserTasks,
};
