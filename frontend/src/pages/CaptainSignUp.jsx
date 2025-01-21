import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext.jsx";
import axios from "axios";
import { ArrowRightIcon } from "lucide-react";

// User Sign Up Page
export default function CaptainSignUp() {
  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicle, setVehicle] = useState({
    color: "",
    capacity: 0,
    vehicleType: "",
    plateNumber: "",
  });

  // Get the navigate function from react router
  const navigate = useNavigate();

  // Get the setCaptain function from the CaptainDataContext
  const { setCaptain, setIsLoading, isLoading } =
    useContext(CaptainDataContext);

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Set loading to true
    setIsLoading(true);

    // Create a new captain data object
    const captainData = {
      email: email,
      password: password,
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      vehicle: vehicle,
    };

    // Send a POST request to the server
    await axios
      .post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
      .then((response) => {
        // Set the captain data in the context
        setCaptain(response.data.captain);
        // Set token to local storage
        localStorage.setItem("token-captain", response.data.token);
        // Navigate to the home page
        navigate("/captain-home");
      })
      .catch((error) => {
        alert(`${error.response.data.message}`);
      })
      .finally(() => {
        // Set loading to false
        setIsLoading(false);
        // clear the form
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setVehicle({
          color: "",
          capacity: 0,
          vehicleType: "",
          plateNumber: "",
        });
      });
  };

  // Return the page content
  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img
            className="w-16"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
            alt=""
          />
          <ArrowRightIcon size={30} className="mb-2" />

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
                  setFirstName(e.target.value);
                }}
              />
              <input
                required
                className="bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
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
                setPassword(e.target.value);
              }}
              required
              type="password"
              placeholder="password"
            />

            <h3 className="text-lg font-medium mb-2">Enter Vehicle Details</h3>
            <div className="grid grid-cols-2 gap-4 mb-7">
              <label htmlFor="color" className="text-lg font-medium mb-2">
                Color
              </label>
              <input
                required
                id="color"
                className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                type="text"
                placeholder="Color"
                value={vehicle.color}
                onChange={(e) => {
                  setVehicle({ ...vehicle, color: e.target.value });
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-7">
              <label htmlFor="capacity" className="text-lg font-medium mb-2">
                Capacity
              </label>
              <input
                required
                id="capacity"
                className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                type="text"
                placeholder="Capacity"
                value={vehicle.capacity}
                onChange={(e) => {
                  setVehicle({ ...vehicle, capacity: e.target.value });
                }}
              />
              <label htmlFor="vehicleType" className="text-lg font-medium mb-2">
                Vehicle Type
              </label>
              <select
                required
                id="vehicleType"
                className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                value={vehicle.vehicleType}
                onChange={(e) => {
                  setVehicle({ ...vehicle, vehicleType: e.target.value });
                }}
              >
                <option value="">Select Type</option>
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="auto">Auto</option>
              </select>
              <label htmlFor="plateNumber" className="text-lg font-medium mb-2">
                Plate Number
              </label>
              <input
                required
                id="plateNumber"
                className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                type="text"
                placeholder="Plate Number"
                value={vehicle.plateNumber}
                onChange={(e) => {
                  setVehicle({ ...vehicle, plateNumber: e.target.value });
                }}
              />
            </div>

            <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
              {isLoading ? "Loading..." : "Create account"}
            </button>
          </form>
          <p className="text-center">
            Already a captain?{" "}
            <Link to="/captain-login" className="text-blue-600">
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
