/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

// Context to store captain data
export const CaptainDataContext = createContext();

// Context to store captain data
export default function CaptainContext({ children }) {
  // State to store captain data and loading state and error state
  const [captain, setCaptain] = useState(null);

  // Return the CaptainDataContext.Provider component
  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
}
