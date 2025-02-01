const express = require("express");
const { body, query } = require("express-validator");
const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// create a new router
const rideRouter = express.Router();

// Ride post route to create a new ride
rideRouter.post(
  "/create-ride",
  [
    body("pickup").isString().notEmpty().isLength({ min: 1 }),
    body("destination").isString().notEmpty().isLength({ min: 1 }),
    body("vehicleType")
      .isString()
      .notEmpty()
      .isLength({ min: 1 })
      .isIn(["auto", "car", "moto"]),
  ],
  authMiddleware.authUser,
  rideController.createRide
);

// Ride get route to get the fare for a ride
rideRouter.get(
  "/get-fare",
  [
    query("pickup").isString().notEmpty().isLength({ min: 1 }),
    query("destination").isString().notEmpty().isLength({ min: 1 }),
  ],
  authMiddleware.authUser,
  rideController.getFare
);

// Export the map router
module.exports = rideRouter;
