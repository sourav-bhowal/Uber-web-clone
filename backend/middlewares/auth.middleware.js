const userModel = require("../models/user.model");
const captainModel = require("../models/captain.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackListTokenModel = require("../models/blackListToken.model");

// Middleware to authenticate the user
module.exports.authUser = async (req, res, next) => {
  // Get the token from the header or cookie
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  // If token is not found return an error
  if (!token) {
    return res.status(401).json({ message: "Access denied. Unauthorized" });
  }

  // Is token found blacklisted
  const isTokenBlackListed = await blackListTokenModel.findOne({ token });

  // If token is blacklisted return an error
  if (isTokenBlackListed) {
    return res.status(401).json({ message: "Access denied. Unauthorized." });
  }

  // Verify the token
  try {
    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user
    req.user = await userModel.findById(decoded._id);

    // Next middleware function
    return next();
  } catch (error) {
    // If token is invalid return an error
    return res.status(400).json({ message: "Invalid token" });
  }
};

// Middleware to authenticate the captain
module.exports.authCaptain = async (req, res, next) => {
  // Get the token from the header or cookie
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  // If token is not found return an error
  if (!token) {
    return res.status(401).json({ message: "Access denied. Unauthorized" });
  }

  // Is token found blacklisted
  const isTokenBlackListed = await blackListTokenModel.findOne({ token });

  // If token is blacklisted return an error
  if (isTokenBlackListed) {
    return res.status(401).json({ message: "Access denied. Unauthorized." });
  }

  // Verify the token
  try {
    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the captain
    req.captain = await captainModel.findById(decoded._id);

    // Next middleware function
    return next();
  } catch (error) {
    // If token is invalid return an error
    return res.status(400).json({ message: "Invalid token" });
  }
};
