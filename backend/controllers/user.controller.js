const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blackListToken.model");

// Register a new user controller
module.exports.registerUser = async (req, res, next) => {
  // Check for errors
  const errors = validationResult(req);

  // If there is error return the error
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Deconstruct the request body
  const { email, password, fullName } = req.body;

  // Hash the password
  const hashedPassword = await userModel.hashPassword(password);

  // Create a new user
  const user = await userService.createUser({
    email,
    password: hashedPassword,
    firstName: fullName.firstName,
    lastName: fullName.lastName,
  });

  // Generate the auth token
  const token = user.generateAuthToken();

  // Send the response
  res.status(201).json({
    message: "User created successfully",
    user,
    token,
  });
};

// Login a user controller
module.exports.loginUser = async (req, res, next) => {
  // Check for errors
  const errors = validationResult(req);

  // If there is error return the error
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Deconstruct the request body
  const { email, password } = req.body;

  // Find the user
  const user = await userModel.findOne({ email }).select("+password");

  // If user is not found return an error
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Compare the password
  const isValidPassword = await user.comparePassword(password, user.password);

  // If password is not valid return an error
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Generate the auth token
  const token = user.generateAuthToken();

  // Set the token in the cookie
  res.cookie("token", token, {
    expires: new Date(Date.now() + 86400000),
    secure: false, // set to true if your using https
    httpOnly: true,
  });

  // Send the response
  res.status(200).json({
    message: "User logged in successfully",
    user,
    token,
  });
};

// Get user profile controller
module.exports.getUserProfile = async (req, res, next) => {
  // Send the response with the user
  res.status(200).json(req.user);
};

// Logout a user controller
module.exports.logoutUser = async (req, res, next) => {
  // Clear the cookie token
  res.clearCookie("token");

  // Get the token
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  // Add the token to the black list token collection
  await blackListTokenModel.create({ token });

  // Send the response with a message
  res.status(200).json({ message: "User logged out successfully" });
};
