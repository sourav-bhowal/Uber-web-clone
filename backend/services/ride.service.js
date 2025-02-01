const mapService = require("./map.service");
const rideModel = require("../models/ride.model");
const crypto = require("crypto");

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
  console.log(otp);
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
