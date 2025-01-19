const blackListTokenModel = require("../models/blackListToken.model");
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

// Register a new captain controller
module.exports.registerCaptain = async (req, res, next) => {
  // Check for errors
  const errors = validationResult(req);

  // If there is error return the error
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Deconstruct the request body
  const { email, password, fullName, vehicle } = req.body;

  console.log(req.body);

  // Find the captain by email to check if captain already exists
  const existingCaptain = await captainModel.findOne({ email });

  // If captain already exists return an error
  if (existingCaptain) {
    return res.status(400).json({ message: "Captain already exists" });
  }

  // Hash the password
  const hashedPassword = await captainModel.hashPassword(password);

  // Create a new captain
  const captain = await captainService.createCaptain({
    email,
    password: hashedPassword,
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    color: vehicle.color,
    capacity: vehicle.capacity,
    plateNumber: vehicle.plateNumber,
    vehicleType: vehicle.vehicleType,
  });

  // Generate the auth token
  const token = captain.generateAuthToken();

  // Send the response
  res.status(201).json({
    message: "Captain created successfully",
    captain,
    token,
  });
};

// Login a captain controller
module.exports.loginCaptain = async (req, res, next) => {
  // Check for errors
  const errors = validationResult(req);

  // If there is error return the error
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Deconstruct the request body
  const { email, password } = req.body;

  // Find the captain by email
  const captain = await captainModel.findOne({ email }).select("+password");

  // If captain does not exist return an error
  if (!captain) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Compare the password
  const validPassword = await captain.comparePassword(
    password,
    captain.password
  );

  // If password is invalid return an error
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Generate the auth token
  const token = captain.generateAuthToken();

  // Set the token in the cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 86400000), // 1 day
  });

  // Send the response
  res.status(200).json({
    message: "Captain logged in successfully",
    captain,
    token,
  });
};

// Get the profile of a captain controller
module.exports.getCaptainProfile = async (req, res, next) => {
  // Send the response
  res.status(200).json({ captain: req.captain });
};

// Logout a captain controller
module.exports.logoutCaptain = async (req, res, next) => {
  // Get the token
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  // Add the token to the blacklist collection
  await blackListTokenModel.create({ token });

  // Clear the token from the cookie
  res.clearCookie("token");

  // Send the response
  res.status(200).json({ message: "Captain logged out successfully" });
};
