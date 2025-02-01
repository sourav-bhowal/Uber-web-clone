const axios = require("axios");

// Function to get the coordinates of an address
module.exports.getAddressCoordinates = async (address) => {
  if (!address) {
    throw new Error("Address is required");
  }
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } else {
      throw new Error(`Geocoding error: ${response.data.status}`);
    }
  } catch (error) {
    throw new Error(`Failed to fetch coordinates: ${error.message}`);
  }
};

// Function to get distance and time between two locations
module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }
  // Get the API key from the environment variables
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  // Create the URL for the Google Distance Matrix API
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const data = response.data.rows[0].elements[0];
      return {
        distance: data.distance,
        duration: data.duration,
      };
      
    } else {
      throw new Error(`Distance matrix error: ${response.data.status}`);
    }
  } catch (error) {
    throw new Error(`Failed to fetch distance and time: ${error.message}`);
  }
};

// Function to get autocomplete suggestions
module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("Input is required");
  }
  // Get the API key from the environment variables
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  // Create the URL for the Google Places Autocomplete API
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      // Extract the description from the predictions array
      return response.data.predictions.map(
        (prediction) => prediction.description
      );
    } else {
      throw new Error(`Autocomplete error: ${response.data.status}`);
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch autocomplete suggestions: ${error.message}`
    );
  }
};
