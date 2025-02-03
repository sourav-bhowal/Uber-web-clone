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
    ride.otp = "";

    // Send the new ride to the captains in the radius
    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("userId");

    // Emit the new-ride event to the captains in the radius
    captainsInRadius.map(async (captain) => {
      // Get distance and time between captain and pickup
      const distanceTime = await mapService.getDistanceTime(
        `${captain.location.coordinates[1]},${captain.location.coordinates[0]}`,
        `${pickupCoordinates.ltd},${pickupCoordinates.lng}`
      );

      // Time to reach the pickup
      const timeToReachPickup = {
        distance: distanceTime.distance.text,
        duration: distanceTime.duration.text,
      }

      // Emit the new-ride event to the captain
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: {
          rideDetails: rideWithUser,
          timeToReachPickup,
        },
      });
    });
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

// Confirm a ride controller function
module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Get the ride id from the request body
  const { rideId } = req.body;

  console.log(rideId, req.captain._id);

  try {
    // Confirm the ride with the given ride id
    const ride = await rideService.confirmRide({
      rideId,
      captain: req.captain,
    });

    // Emit the ride-confirmed event to the user
    sendMessageToSocketId(ride.userId.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    // Return the confirmed ride
    return res.status(200).json(ride);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

// Start a ride controller function
module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Get the ride id and otp from the request query
  const { rideId, otp } = req.query;

  try {
    // Start the ride with the given ride id and otp
    const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

    // Emit the ride-started event to the user
    sendMessageToSocketId(ride.userId.socketId, {
      event: "ride-started",
      data: ride,
    });

    // Return the started ride
    return res.status(200).json(ride);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

// End a ride controller function
module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Get the ride id from the request body
  const { rideId } = req.body;

  try {
    // End the ride with the given ride id
    const ride = await rideService.endRide({ rideId, captain: req.captain });

    // Emit the ride-ended event to the user
    sendMessageToSocketId(ride.userId.socketId, {
      event: "ride-ended",
      data: ride,
    });

    // Return the ended ride
    return res.status(200).json(ride);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};