import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

// User Login page component
export default function UserLogin() {
  // State for email and password input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Get the setUser function from the UserDataContext
  const { setUser } = useContext(UserDataContext);

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    // Prevent default form submission
    e.preventDefault();

    // Set loading to true
    setLoading(true);

    // Create a new user data object
    const userData = {
      email: email,
      password: password,
    };

    // Send a POST request to the server
    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
      .then((response) => {
        // Set the user data in the context
        setUser(response.data.user);
        // Set token to local storage
        localStorage.setItem("token", response.data.token);
        // Navigate to the home page
        navigate("/home");
        // Set loading to false
        setLoading(false);
      })
      .catch((error) => {
        alert(`${error.response.data.message}`);
        // Set loading to false
        setLoading(false);
      })
      .finally(() => {
        // Clear the input fields
        setEmail("");
        setPassword("");
        // Set loading to false
        setLoading(false);
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
          <h3 className="text-lg font-medium mb-2">Enter your email</h3>
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

          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Sign Up
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="bg-red-600 flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
}
