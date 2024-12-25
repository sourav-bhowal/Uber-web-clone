import { createContext, useState } from "react";

// Create a context to store the user data
export const UserDataContext = createContext();

// Summary: This file contains the user context. It is used to store the user information and provide it to the components that need it.
export default function UserContext({ children }) {
  // State to store the user data
  const [userData, setUserData] = useState({
    email: "",
    fullName: {
      firstName: "",
      lastName: "",
    },
  });
  return (
    <div>
      {/* The UserDataContext.Provider component is used to provide the user data to the components that need it. The value prop is used to pass the user data to the components. */}
      <UserDataContext.Provider value={{ userData, setUserData }}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
}
