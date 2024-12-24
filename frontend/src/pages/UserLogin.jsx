import { useState } from "react";
import { Link } from "react-router-dom";

// User Login page component
export default function UserLogin() {
  // State for email and password input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for user data object
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    // Prevent default form submission
    e.preventDefault();
    // Set the user data state
    setUserData({
      email: email,
      password: password,
    });
    // Clear the input fields
    setEmail("");
    setPassword("");
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

          <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
            Login
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
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
}
