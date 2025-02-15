/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserDataContext } from "./UserContext";
import axios from "axios";
// Summary: This component is used to protect routes that require a user to be logged in.
export default function UserProtectedWrapper({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { setUser } = useContext(UserDataContext);
  
  // Check if user is logged in by checking if token is in local storage and if it is valid
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
        }
      })
      .catch(() => {
        localStorage.removeItem(token);
        navigate("/login");
      });
  }, [navigate, setUser, token]); // This effect runs when the component mounts

  return <>{children}</>;
}
