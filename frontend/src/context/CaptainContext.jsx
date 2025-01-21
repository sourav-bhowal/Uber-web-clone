/* eslint-disable react/prop-types */
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
  function setCaptainData(captainData) {
    setIsLoading(true);
    setCaptain(captainData);
    setIsLoading(false);
  }

  // Function to clear captain data
  function clearCaptain() {
    setIsLoading(true);
    setCaptain(null);
    setIsLoading(false);
  }

  // Value to pass to the context
  const value = {
    captain,
    setCaptain,
    setCaptainData,
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
