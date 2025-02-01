const mongoose = require("mongoose");

// Ride Schema for MongoDB database
const rideSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    captainId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Captain",
    },
    pickup: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      required: true,
      select: false,
    },
    fare: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "completed", "canceled", "ongoing"],
      default: "pending",
    },
    duration: {
      type: Number, // in seconds
    },
    distance: {
      type: Number, // in meters
    },
    paymentId: {
      type: String, // Payment ID from the payment gateway
    },
    orderId: {
      type: String, // Order ID from the payment gateway
    },
    signature: {
      type: String, // Signature from the payment gateway
    },
  },
  { timestamps: true }
);

// Create the Ride model
const rideModel = mongoose.model("Ride", rideSchema);

// Export the Ride model
module.exports = rideModel;
