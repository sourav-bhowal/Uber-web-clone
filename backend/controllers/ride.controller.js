const { validationResult } = require("express-validator");
const rideModel = require("../models/ride.model");
const rideService = require("../services/ride.service");
const mapService = require("../services/map.service");
const { sendMessageToSocketId } = require("../lib/socket");

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

    // Return the ride details
    res.status(201).json(ride);

    // Get the pickup coordinates
    const pickupCoordinates = await mapService.getAddressCoordinates(pickup);

    // Get the nearest captains in the radius
    const captainsInRadius = await rideService.getCaptainsInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      2, // 2 km radius
      vehicleType
    );

    // Hide the otp from the ride object before sending it to the captains
    ride.otp = ""

    // Send the new ride to the captains in the radius
    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("userId");

    // Emit the new ride to the captains in the radius
    captainsInRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });
  } catch (err) {
    console.log(err)
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

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.confirmRide({
      rideId,
      captain: req.captain,
    });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
