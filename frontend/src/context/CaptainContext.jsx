import React from "react";
import { createContext, useState } from "react";

// Context to store captain data
export const CaptainDataContext = createContext();

// Context to store captain data
export default function CaptainContext({ children }) {
  // State to store captain data and loading state and error state
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to update captain data
  function updateCaptain(captainData) {
    setCaptain(captainData);
  }

  // Function to clear captain data
  function clearCaptain() {
    setCaptain(null);
  }

  // Value to pass to the context
  const value = {
    captain,
    setCaptain,
    updateCaptain,
    clearCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
  };

  // Return the CaptainDataContext.Provider component
  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
}
