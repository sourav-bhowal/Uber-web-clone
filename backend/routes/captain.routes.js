const express = require("express");
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");

// Captain router
const captainRouter = express.Router();

// Captain post route to register a new captain
captainRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be 3 charcter long"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be 5 charcter long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be 3 charcter long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be a number"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vehicle type"),
    body("vehicle.plateNumber")
      .isLength({ min: 3 })
      .withMessage("Plate number must be 3 charcter long"),
  ],
  captainController.registerCaptain
);

// Export captain router
module.exports = captainRouter;
