const mapService = require("./map.service");
const rideModel = require("../models/ride.model");
const crypto = require("crypto");
const captainModel = require("../models/captain.model");

// Get the fare for each vehicle type function
module.exports.getRideFare = async (pickup, destination) => {
  // Check if the origin and destination are provided
  if (!pickup || !destination) {
    throw new Error("Origin and destination are required");
  }

  try {
    // Get the distance and time between the origin and destination using the map service
    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    // Base fare for each vehicle type
    const baseFare = {
      auto: 50,
      car: 100,
      moto: 30,
    };

    // Per kilometer rate for each vehicle type
    const perKmRate = {
      auto: 10,
      car: 15,
      moto: 8,
    };

    // Per minute rate for each vehicle type
    const perMinuteRate = {
      auto: 2,
      car: 3,
      moto: 1.5,
    };

    // fare for each vehicle type for the given distance and time
    const fare = {
      auto: Math.round(
        baseFare.auto +
          (distanceTime.distance.value / 1000) * perKmRate.auto +
          (distanceTime.duration.value / 60) * perMinuteRate.auto
      ),
      car: Math.round(
        baseFare.car +
          (distanceTime.distance.value / 1000) * perKmRate.car +
          (distanceTime.duration.value / 60) * perMinuteRate.car
      ),
      moto: Math.round(
        baseFare.moto +
          (distanceTime.distance.value / 1000) * perKmRate.moto +
          (distanceTime.duration.value / 60) * perMinuteRate.moto
      ),
    };
    // Return the fare for each vehicle type
    return fare;
  } catch (error) {
    throw new Error(`Failed to calculate ride fare: ${error.message}`);
  }
};

// Generate OTP function
module.exports.generateOTP = () => {
  // Generate a random 4 digit OTP
  const otp = crypto.randomInt(1000, 10000); // Generate a random 4 digit OTP using crypto
  // Return otp
  return otp;
};

// Function to book a ride with the given vehicle type
module.exports.bookRide = async ({
  userId,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!userId || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  // Get the fare for the selected vehicle type
  const fare = await this.getRideFare(pickup, destination);

  // Get the user from the user model
  const ride = rideModel.create({
    userId,
    pickup,
    destination,
    otp: this.generateOTP(), // Generate an OTP for the ride
    fare: fare[vehicleType], // Use the fare for the selected vehicle type
  });

  return ride;
};

// Function to get the captains in a given radius
module.exports.getCaptainsInTheRadius = async (
  ltd,
  lng,
  radius,
  vehicleType
) => {
  // radius in km

  // Check if the latitude, longitude, and radius are provided
  if (!ltd || !lng || !radius || !vehicleType) {
    throw new Error("Latitude, longitude, and radius are required");
  }

  // Get the captain model
  const captains = await captainModel.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [lng, ltd],
        },
        distanceField: "distance",
        maxDistance: radius * 1000, // Convert radius to meters
        spherical: true,
        key: "location",
        query: {
          "vehicle.vehicleType": vehicleType,
        },
      },
    },
  ]);

  return captains;
};

// Function to confirm the ride with the given ride id and captain
module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  // Find the ride with the given ride id and update the status to accepted
  const ride = await rideModel
    .findOneAndUpdate(
      {
        _id: rideId,
      },
      {
        status: "accepted",
        captainId: captain._id,
      },
      { new: true }
    )
    .populate("userId")
    .populate("captainId")
    .select("+otp");
  // Check if the ride is not found
  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

// Function to start the ride with the given ride id and otp
module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp || !captain) {
    throw new Error("Ride id and OTP are required");
  }

  // Find the ride with the given ride id & capatinId and otp and update the status to ongoing
  const ride = await rideModel
    .findOneAndUpdate(
      {
        _id: rideId,
        captainId: captain._id, // only the captain who accepted the ride can start the ride
        otp,
      },
      {
        status: "ongoing",
      },
      { new: true }
    )
    .populate("userId")
    .populate("captainId")
    .select("+otp");

  // Check if the ride is not found
  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

// Function to end the ride with the given ride id
module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  // Find the ride with the given ride id and update the status to completed
  const ride = await rideModel
    .findOneAndUpdate(
      {
        _id: rideId,
        captainId: captain._id, // only the captain who started the ride can end the ride
      },
      {
        status: "completed",
      },
      { new: true }
    )
    .populate("userId")
    .populate("captainId");

  // Check if the ride is not found
  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};
