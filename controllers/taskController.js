const Task = require("../models/Task");
const asyncWrapper = require("../middlewares/asyncWrapper");
const { createCustomError } = require("../errors/customError");

// custom task details
const customTaskDetails = (task) => {
  const { _id, title, description, status, dueDate, createdAt, updatedAt } =
    task;
  return { _id, title, description, status, dueDate, createdAt, updatedAt };
};

// add new Task
const addTask = asyncWrapper(async (req, res) => {
  // Extract task details from the request body
  const { title, description, status, dueDate } = req.body;

  // Check if a task with the same title already exists for the user
  const existingTask = await Task.findOne({
    title,
    owner: req.user._id,
  });

  if (existingTask) {
    throw createCustomError("Todo with the same title already exists", 400);
  }

  // Create a new task with user ID as the owner
  const task = new Task({
    title,
    description,
    status,
    dueDate,
    owner: req.user._id,
  });

  await task.save();

  // task details
  const taskDetails = customTaskDetails(task);

  // Respond with the created task and a success message
  res.status(201).json({
    message: "Todo created successfully",
    todo: taskDetails,
  });
});

// get all Task
const getUserTasks = asyncWrapper(async (req, res) => {
  // Retrieve tasks owned by the authenticated user
  const tasks = await Task.find({
    owner: req.user._id,
  });

  // Customize task details for the response
  const formattedTasks = tasks.map((task) => customTaskDetails(task));

  // Respond with the tasks and additional information
  res.status(200).json({
    message: "Todos fetched successfully",
    count: formattedTasks.length,
    tasks: formattedTasks,
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
    throw createCustomError("No todo found", 404);
  }

  // Format the task details for the response
  const formattedTask = customTaskDetails(task);

  res.status(200).json({
    message: "Todo fetched successfully",
    todo: formattedTask,
  });
});

// update a Task by id
const updateTaskById = asyncWrapper(async (req, res) => {
  const taskID = req.params.id;

  // Extract updates from request body
  const updates = Object.keys(req.body);

  // Allowed updates for a task
  const allowedUpdates = ["title", "description", "status", "dueDate"];

  // Check if updates are valid
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    throw createCustomError("Invalid Updates", 400);
  }

  // Find the task by ID and owner
  const task = await Task.findOne({
    _id: taskID,
    owner: req.user._id,
  });

  if (!task) {
    throw createCustomError("No todo found", 404);
  }

  updates.forEach((update) => (task[update] = req.body[update]));

  await task.save();

  // Format the updated task details for the response
  const formattedTask = customTaskDetails(task);

  res.status(200).json({
    message: "Todo updated successfully",
    todo: formattedTask,
  });
});

// delete a Task by id
const deleteTaskById = asyncWrapper(async (req, res) => {
  const taskID = req.params.id;

  // Find and delete the task by ID and owner
  const task = await Task.findOneAndDelete({
    _id: taskID,
    owner: req.user._id,
  });

  if (!task) {
    throw createCustomError("No todo found", 404);
  }

  res.status(200).json({
    message: `${task.title} - deleted successfully`,
    todo: {
      title: task.title,
      status: task.status,
    },
  });
});

module.exports = {
  addTask,
  getUserTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
