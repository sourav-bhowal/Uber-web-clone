const { validationResult } = require("express-validator");
const rideModel = require("../models/ride.model");
const rideService = require("../services/ride.service");
const mapService = require("../services/map.service");

// Create a new ride controller
module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Get the pickup, destination, and vehicle type from the request body
  const { pickup, destination, vehicleType } = req.body;

  try {
    // Book a ride with the given pickup, destination, and vehicle type
    const ride = await rideService.bookRide({
      userId: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    return res.status(201).json(ride);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

// Get Fare for a ride controller
module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Get the pickup and destination from the request query
  const { pickup, destination } = req.query;

  try {
    // Get the fare for the given pickup and destination
    const fare = await rideService.getRideFare(pickup, destination);

    // Return the fare for the ride
    return res.status(200).json(fare);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
