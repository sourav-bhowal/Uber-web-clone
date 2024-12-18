const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// BlackListToken Schema
const blackListTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // this is the expiry time in seconds (24 hours)
  },
});

// export the model
module.exports = mongoose.model("BlackListToken", blackListTokenSchema);
