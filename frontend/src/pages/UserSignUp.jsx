import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

// User Sign Up Page
export default function UserSignUp() {
  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // User context object
  const { setUser } = useContext(UserDataContext);

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Create a new user object
    const newUser = {
      email,
      password,
      fullName: {
        firstName,
        lastName,
      },
    };

    // Set loading to true
    setLoading(true);

    // Send a POST request to the server
    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
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
        setFirstName("");
        setLastName("");
        // Set loading to false
        setLoading(false);
      });
  };

  // Return the page content
  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img
            className="w-16 mb-10"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
            alt=""
          />

          <form onSubmit={handleFormSubmit}>
            <h3 className="text-lg w-1/2  font-medium mb-2">
              What&apos;s your name
            </h3>
            <div className="flex gap-4 mb-7">
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value); // Set the first name state variable to the value of the input field
                }}
              />
              <input
                required
                className="bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value); // Set the last name state variable to the value of the input field
                }}
              />
            </div>

            <h3 className="text-lg font-medium mb-2">What&apos;s your email</h3>
            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              type="email"
              placeholder="email@example.com"
            />

            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value); // Set the password state variable to the value of the input field
              }}
              required
              type="password"
              placeholder="password"
            />

            <button
              type="submit"
              className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>
          <p className="text-center">
            Already have a account?{" "}
            <Link to="/login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </div>
        <div>
          <p className="text-[10px] leading-tight">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
