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
