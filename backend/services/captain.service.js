const captainModel = require("../models/captain.model");

// Register a new captain
module.exports.createCaptain = async ({
  firstName,
  lastName,
  email,
  password,
  color,
  capacity,
  plateNumber,
  vehicleType,
}) => {
  // check if all fields are provided
  if (
    !firstName ||
    !email ||
    !password ||
    !color ||
    !capacity ||
    !plateNumber ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }

  // create a new captain in the database
  const captain = await captainModel.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
    vehicle: {
      color,
      capacity,
      plateNumber,
      vehicleType,
    },
  });

  // return the captain
  return captain;
};
