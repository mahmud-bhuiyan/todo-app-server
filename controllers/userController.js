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

// Array to store destroyed tokens
const destroyedTokens = [];

//register
const registerUser = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;

  // Duplicate user handling
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createCustomError("Email is already in use", 400);
  }

  // New user
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = new User({ name, email, password: hashedPassword });

  await user.save();

  // user details
  const userDetails = customUserDetails(user);

  res
    .status(201)
    .send({ message: "User created successfully", user: userDetails });
});

//login
const loginUser = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw createCustomError("User not found!", 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw createCustomError("Invalid credentials", 401);
  }

  const token = jwt.sign(
    {
      _id: user._id.toString(),
    },
    process.env.JWT_SECRET_KEY
  );

  if (destroyedTokens.includes(token)) {
    throw createCustomError("Token has been destroyed", 401);
  }

  // user details
  const userDetails = customUserDetails(user);

  res.send({ message: "Logged in successfully", user: userDetails, token });
});

// Logout user
const logoutUser = asyncWrapper(async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw createCustomError("Token not provided", 401);
  }

  destroyedTokens.push(token);

  res.status(200).send({ message: "User logged out successfully" });
});

// viewUserDetails
const viewUserDetails = asyncWrapper(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  if (!user) {
    throw createCustomError("User not found!", 404);
  }

  // user details
  const userDetails = customUserDetails(user);

  // Sending the response with user details
  res.status(200).json({ message: "User found", user: userDetails });
});

// updateUserDetails
const updateUserDetails = asyncWrapper(async (req, res) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  // Find the user by ID
  const user = await User.findById(userId);

  if (!user) {
    throw createCustomError("User not found!", 404);
  }

  // Update user details
  user.name = name || user.name;
  user.email = email || user.email;

  // Save the updated user
  await user.save();

  // Updated user details
  const userDetails = customUserDetails(user);

  // Sending the response with updated user details
  res
    .status(200)
    .json({ message: "User updated successfully", user: userDetails });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  viewUserDetails,
  updateUserDetails,
};
