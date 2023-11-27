const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncWrapper = require("../middlewares/asyncWrapper");
const { createCustomError } = require("../errors/customError");

// custom user details
const customUserDetails = (user) => {
  const { _id, name, email } = user;
  return { _id, name, email };
};

//register
const registerUser = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;

  // Duplicate user handling
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createCustomError("Email is already in use", 400);
  }

  // New user
  const user = new User({ name, email, password });
  await user.save();

  // user details
  const userDetails = customUserDetails(user);

  res
    .status(201)
    .send({ user: userDetails, message: "User created successfully" });
});

module.exports = { registerUser };
