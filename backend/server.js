const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./lib/socket");

// Set the port to the environment variable PORT, or 3000 if the environment variable is not set
const port = process.env.PORT || 3000;

// Create a server that uses the app created in the app.js file
const server = http.createServer(app);

// Require the socket.js file and initialize the socket.io server with the server created above
initializeSocket(server);

// Listen on the specified port and log a message to the console when the server is running
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
