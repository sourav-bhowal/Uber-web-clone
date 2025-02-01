/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

// Create a context to store the user data
export const UserDataContext = createContext();

// Summary: This file contains the user context. It is used to store the user information and provide it to the components that need it.
export default function UserContext({ children }) {
  // State to store the user data
  const [user, setUser] = useState({
    email: "",
    fullName: {
      firstName: "",
      lastName: "",
    },
  });

  // Return the UserDataContext.Provider component
  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
}
