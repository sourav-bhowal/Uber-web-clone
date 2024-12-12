const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require("cors");

// Allow all CORS requests
app.use(cors());

// Set up a basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Export the app object
module.exports = app;