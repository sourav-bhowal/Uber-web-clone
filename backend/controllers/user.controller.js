const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

// Register a new user
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
