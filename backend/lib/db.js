const mongoose = require("mongoose");

// Connect to the MongoDB database using the connection string in the environment variable MONGODB_URI
function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: "Uber",
    })
    .then(() => console.log("Connected to the database!!!"))
    .catch((error) => console.log(error));
}

// Export the connectDB function
module.exports = connectDB;
