const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  viewUser,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.get("/", (req, res) => {
  res.send("User routes are working!");
});

// Register a user
router.post("/register", registerUser);

// Login a user
router.post("/login", loginUser);

// Logout a user
router.post("/logout", auth, logoutUser);

// View user details
router.get("/user", auth, viewUser);

module.exports = router;
