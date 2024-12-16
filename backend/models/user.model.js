const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User Schema for MongoDB database
const userSchema = mongoose.Schema({
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
});

// Generate the auth token for the user
userSchema.methods.generateAuthToken = function () {
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

// Hash the password before saving the user
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// Compare the password with the hashed password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// User model for MongoDB
const userModel = mongoose.model("User", userSchema);

// Export the user model
module.exports = userModel;
