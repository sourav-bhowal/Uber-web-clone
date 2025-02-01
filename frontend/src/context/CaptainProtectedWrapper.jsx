import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import { CaptainDataContext } from "./CaptainContext";

// Summary: This component is used to protect routes that require a captain to be logged in.
// eslint-disable-next-line react/prop-types
export default function CaptainProtectedWrapper({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token-captain");
  const { setCaptain } = useContext(CaptainDataContext);

  // Check if user is logged in by checking if token is in local storage and if it is valid
  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCaptain(response.data.captain);
        }
      })
      .catch(() => {
        localStorage.removeItem(token);
        navigate("/captain-login");
      });
  }, [navigate, setCaptain, token]);

  return <>{children}</>;
}
