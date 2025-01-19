import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserLogout() {
  // get token from local storage
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // send token to backend to blacklist it
  axios
    .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      // clear local storage
      localStorage.clear();
      // navigate to home page
      navigate("/");
    })
    .catch((error) => {
      alert(`${error.response.data.message}`);
    });

  return <div>UserLogout</div>;
}
