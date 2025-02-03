const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Captain Schema for MongoDB database
const captainSchema = mongoose.Schema(
  {
    fullName: {
      firstName: {
        type: String,
        minLength: [3, "First name must be at least 3 characters long"],
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        minLength: [3, "Last name must be at least 3 characters long"],
      },
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
      minLength: [5, "Password must be at least 5 characters long"],
    },
    socketId: {
      type: String,
    },
    isOnline: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    location: {
      type: { type: String, enum: ["Point"] },
      coordinates: { type: [Number] }, // [longitude, latitude]
    },
    vehicle: {
      color: {
        type: String,
        required: true,
        minLength: [3, "Color must be at least 3 characters long"],
        trim: true,
      },
      capacity: {
        type: Number,
        required: true,
        min: [1, "Capacity must be at least 1"],
      },
      plateNumber: {
        type: String,
        required: true,
        minLength: [3, "Plate number must be at least 3 characters long"],
        trim: true,
      },
      vehicleType: {
        type: String,
        required: true,
        enum: ["car", "motorcycle", "auto"],
      },
    },
  },
  {
    timestamps: true,
  }
);

// Index the location field for faster geospatial queries
captainSchema.index({ location: "2dsphere" });

// Generate the auth token for the captain
captainSchema.methods.generateAuthToken = function () {
  // generate token
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  // return token
  return token;
};

// Hash the password before saving the captain
captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// Compare the password with the hashed password
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Export the Captain model
module.exports = mongoose.model("Captain", captainSchema);
