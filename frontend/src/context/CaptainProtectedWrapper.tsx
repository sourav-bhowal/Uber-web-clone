import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

// Summary: This component is used to protect routes that require a captain to be logged in.
export default function CaptainProtectedWrapper({ children }) {
  const navigate = useNavigate();

  // Check if user is logged in by checking if token is in local storage and if it is valid
  useEffect(() => {
    const token = localStorage.getItem("token-captain");
    if (!token) {
      navigate("/captain-login");
    }
  }, [navigate]); // This effect runs when the component mounts

  return <>{children}</>;
}

