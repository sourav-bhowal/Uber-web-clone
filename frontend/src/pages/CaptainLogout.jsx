import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Summary: This component is used to logout a captain by sending a GET request to the server and clearing the token from local storage.
export default function CaptainLogout() {
  // Get the navigate function
  const navigate = useNavigate();

  // Get the token from local storage
  const token = localStorage.getItem("token-captain");

  // Send a GET request to the server to logout the captain
  axios
    .get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      localStorage.removeItem("token-captain");
      navigate("/captain-login");
    })
  return <div>CaptainLogout</div>;
}
