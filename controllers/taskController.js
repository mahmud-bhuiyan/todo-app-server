const Task = require("../models/Task");
const asyncWrapper = require("../middlewares/asyncWrapper");
const { createCustomError } = require("../errors/customError");

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

// get a Task by id
const getTaskById = asyncWrapper(async (req, res) => {
  const taskID = req.params.id;

  const task = await Task.findOne({
    _id: taskID,
    owner: req.user._id,
  });

  if (!task) {
    throw createCustomError("No task found", 404);
  }

  res.status(200).json({
    task,
    message: "Task fetched successfully",
  });
});

module.exports = {
  addTask,
  getUserTasks,
  getTaskById,
};
