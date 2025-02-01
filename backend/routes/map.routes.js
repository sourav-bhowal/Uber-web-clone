const express = require("express");
const mapController = require("../controllers/map.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { query } = require("express-validator");

// Router to handle the map routes
const mapRouter = express.Router();

// Route to get the coordinates of an address
mapRouter.get(
  "/get-coordinates",
  query("address").isString().notEmpty().isLength({ min: 1 }),
  authMiddleware.authUser,
  mapController.getCoordinates
);

// Route to get the distance and time between two locations
mapRouter.get(
  "/get-distance-time",
  query("origin").isString().notEmpty().isLength({ min: 1 }),
  query("destination").isString().notEmpty().isLength({ min: 1 }),
  authMiddleware.authUser,
  mapController.getDistanceTime
);

// Route to get autocomplete suggestions
mapRouter.get(
  "/get-autocomplete-suggestions",
  query("input").isString().notEmpty().isLength({ min: 1 }),
  authMiddleware.authUser,
  mapController.getAutoCompleteSuggestions
);

// Export the map router
module.exports = mapRouter;
