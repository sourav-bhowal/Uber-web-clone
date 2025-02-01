const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./lib/db");
const userRoutes = require("./routes/user.routes")
const captainRoutes = require("./routes/captain.routes")
const mapRoutes = require("./routes/map.routes")
const rideRoutes = require("./routes/ride.routes")

// Create an express app
const app = express();

// Connect to the database
connectDB();

// Allow all CORS requests
app.use(cors());

// Express middleware to parse the incoming requests with JSON payloads
app.use(express.json());

// Express middleware to parse the incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));

// Express middleware to parse the cookies
app.use(cookieParser());

// Use the user routes
app.use("/api/users", userRoutes);

// Use the captain routes
app.use("/api/captains", captainRoutes);

// Use the map routes
app.use("/api/maps", mapRoutes);

// Use the ride routes
app.use("/api/rides", rideRoutes);

// Export the app object
module.exports = app;
