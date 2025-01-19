import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// User Login page component
export default function CaptainLogin() {
  // State for email and password input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Get the captain data context
  const { setCaptainData, isLoading, error, setError, setIsLoading } =
    useContext(CaptainDataContext);

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    // Prevent default form submission
    e.preventDefault();

    // Create a new user data object
    const captainData = {
      email: email,
      password: password,
    };

    // Set loading to true
    setIsLoading(true);

    // Send a POST request to the server
    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)
      .then((response) => {
        setCaptainData(response.data.captain); // Set the captain data in the context
        localStorage.setItem("token-captain", response.data.token); // Set token to local storage
        navigate("/captain-home"); // Navigate to the captain home page
      })
      .catch((error) => {
        alert(`${error.response.data.message}`);
        setError(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
        setEmail("");
        setPassword("");
      });
  };

  // Return the JSX for the User Login page
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
          alt="uber"
        />
        {/* Form */}
        <form onSubmit={handleFormSubmit}>
          <h3 className="text-lg font-medium mb-2">Enter your captain email</h3>
          <input
            required
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <p className="text-center">
          Still not joined?{" "}
          <Link to="/captain-signup" className="text-blue-600">
            Register as Captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
}
