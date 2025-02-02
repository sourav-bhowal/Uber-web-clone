/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect } from "react";
import { io } from "socket.io-client";

// Create a context to store the socket instance
export const SocketContext = createContext();

// Create a socket instance
const socket = io(`http://localhost:5000`); // Replace with your server URL

// SocketProvider is a component that provides the socket instance to its children
export default function SocketProvider({ children }) {
  useEffect(() => {
    // Basic connection logic
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    // Basic disconnection logic
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }, []);

  // Return the SocketContext.Provider component
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
