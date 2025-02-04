const socketIo = require("socket.io");
const userModel = require("../models/user.model");
const captainModel = require("../models/captain.model");

// Initialize the socket.io server
let io;

// Initialize the socket.io server
function initializeSocket(server) {
  // Create a new socket.io server
  io = socketIo(server, {
    cors: {
      // Allow all CORS requests
      origin: "*",
      methods: ["GET", "POST"], // Allow only
    },
  });

  // Listen for connection events
  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Listen for join events
    socket.on("join", async (data) => {
      // Get the user ID and user type from the data
      const { userId, userType } = data;

      // Update the socket ID for the user or captain
      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    // Listen for update-location-user events
    socket.on("update-location-captain", async (data) => {
      // Get the user ID and location from the data
      const { userId, location } = data;

      // Check if the location data is valid
      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      // Update the location for the captain
      await captainModel.findByIdAndUpdate(userId, {
        location: {
          type: "Point",
          coordinates: [location.lng, location.ltd],
        },
      });
    });

    // Listen for disconnect events
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

// Send a message to a specific socket ID using socket.io
const sendMessageToSocketId = (socketId, messageObject) => {
  // Check if the socket.io server is initialized
  if (io) {
    // Emit the event and data to the socket ID using socket.io
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized.");
  }
};

// Export the functions to initialize the socket and send messages
module.exports = { initializeSocket, sendMessageToSocketId };
