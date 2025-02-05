import { useState, useEffect, useCallback } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

// LiveTracking is a component that displays the live tracking of the user
const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

// LiveTracking is a component that displays the live tracking of the user
const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194,
};

// libraries is an array of libraries to load
const libraries = ["places"];

// LiveTracking is a component that displays the live tracking of the user
const LiveTracking = () => {
  const [position, setPosition] = useState(null);
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Marker SVG
  const markerSvg = (color = "#EA4335") => (
    <svg width="40" height="40" viewBox="0 0 24 24">
      <path
        fill={color}
        d="M12 0C7.31 0 3.5 3.81 3.5 8.5c0 4.69 7.44 14.27 7.78 14.71.19.25.49.4.81.4.32 0 .62-.15.81-.4.34-.44 7.78-10.02 7.78-14.71C20.5 3.81 16.69 0 12 0zm0 13c-2.49 0-4.5-2.01-4.5-4.5S9.51 4 12 4s4.5 2.01 4.5 4.5S14.49 13 12 13z"
      />
    </svg>
  );

  // On map load callback function to set the map instance
  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  // UseEffect to get the user's location and update it every 5 seconds
  useEffect(() => {
    let watchId = null;
    let updateInterval = null;

    // Get the user's location and update it
    const updateLocation = () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        return;
      }

      // Clear any existing watch id and update interval
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPos = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
          setPosition(newPos);  // Update the position
          if (map) map.panTo(newPos);   // Pan the map to the new position
          setLoading(false);
          console.log('Position updated:', newPos); // For debugging
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Error getting location');
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 1000
        }
      );
    };

    // Initial update
    updateLocation();
    
    // Set up interval for updates every second
    updateInterval = setInterval(updateLocation, 5000);

    // Cleanup
    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
      if (updateInterval) clearInterval(updateInterval);
    };
  }, [map]);

  // Return the LiveTracking component
  return (
    <div className="live-tracking-container h-full w-full">
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        version="beta"
        libraries={libraries}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position || defaultCenter}
          zoom={15}
          onLoad={onMapLoad}
          mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
          options={{
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "on" }],
              },
            ],
          }}
        >
          {position && (
            <Marker position={position} title="Your Current Location">
              <div className="marker-container">
                {markerSvg()}
                <div className="pulse-effect"></div>
              </div>
            </Marker>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default LiveTracking;
