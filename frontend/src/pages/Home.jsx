import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Location from "../components/Location";
import ChooseRides from "../components/ChooseRides";
import SelectedRide from "../components/SelectedRide";
import SearchingDrivers from "../components/SearchingDrivers";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";

// Home page
export default function Home() {
  // states
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickUpSuggestions, setPickUpSuggestions] = useState([]);
  const [dropOffSuggestions, setDropOffSuggestions] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [selectedRidePanel, setSelectedRidePanel] = useState(false);
  const [searchingDriversPanel, setSearchingDriversPanel] = useState(false);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);
  const [fare, setFare] = useState({});
  const [activeField, setActiveField] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);

  // refs for location and vehicle panel
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const selectedRideRef = useRef(null);
  const searchingDriversRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  // gsap for location panel
  useGSAP(
    function () {
      if (showPanel) {
        gsap.to(panelRef.current, {
          height: "70%",
          duration: 0.5,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0",
          duration: 0.5,
        });
      }
    },
    [showPanel] // dependency array for gsap
  );

  // gsap for vehicle panel
  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
          duration: 0.5,
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
        });
      }
    },
    [vehiclePanel] // dependency array for gsap
  );

  // gsap for selected ride
  useGSAP(
    function () {
      if (selectedRidePanel) {
        gsap.to(selectedRideRef.current, {
          transform: "translateY(0)",
          duration: 0.5,
        });
      } else {
        gsap.to(selectedRideRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
        });
      }
    },
    [selectedRidePanel] // dependency array for gsap
  );

  // gsap for waiting for driver
  useGSAP(
    function () {
      if (waitingForDriverPanel) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
          duration: 0.5,
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
        });
      }
    },
    [waitingForDriverPanel] // dependency array for gsap
  );

  // gsap for searching drivers
  useGSAP(
    function () {
      if (searchingDriversPanel) {
        gsap.to(searchingDriversRef.current, {
          transform: "translateY(0)",
          duration: 0.5,
        });
      } else {
        gsap.to(searchingDriversRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
        });
      }
    },
    [searchingDriversPanel] // dependency array for gsap
  );

  // Handle pickup location
  const handlePickupLocationChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-autocomplete-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickUpSuggestions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle dropoff location change
  const handleDropoffLocationChange = async (e) => {
    // set dropoff location
    setDropoff(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-autocomplete-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDropOffSuggestions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle find trip fn
  async function handleFindTrip(e) {
    // prevent default form submission
    e.preventDefault();
    // set vector panel to true
    setVehiclePanel(true);
    // set show panel to false
    setShowPanel(false);

    // get fare from the backend
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination: dropoff },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // set fare state
      setFare(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  // Handle create ride fn
  async function handleCreateRide() {
    // set selected ride panel to false
    setSelectedRidePanel(false);
    // create ride
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create-ride`,
        {
          pickup,
          destination: dropoff,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      // set seraching drivers panel to true
      setSearchingDriversPanel(true);
    } catch (error) {
      console.error(error);
    }
  }

  // return the home page
  return (
    <div className="relative h-screen overflow-hidden">
      <h2 className="text-3xl font-bold absolute top-5 left-5">Uber</h2>
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-suboptimal.jpg"
        />
      </div>
      <div className="absolute flex justify-end flex-col w-full top-20 h-screen">
        <div className="h-[33%] p-5 bg-white relative">
          <div className="flex justify-between">
            <h3 className="text-2xl font-semibold">Find a trip</h3>
            {showPanel && (
              <button
                className="bg-black text-white p-1 rounded-lg"
                onClick={() => setShowPanel(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            )}
          </div>
          <form onSubmit={handleFindTrip} className="flex flex-col gap-2">
            <div className="line absolute h-16 w-1 left-10 top-[30%] bg-gray-700 rounded-full"></div>
            <input
              className="bg-[#eee] px-12 py-4 rounded-lg w-full mt-3"
              type="text"
              placeholder="Add your pickup location"
              value={pickup}
              onChange={handlePickupLocationChange}
              onClick={() => {
                setShowPanel(true);
                setActiveField("pickup");
              }}
            />
            <input
              className="bg-[#eee] px-12 py-4 rounded-lg w-full"
              type="text"
              placeholder="Add your dropoff location"
              value={dropoff}
              onChange={handleDropoffLocationChange}
              onClick={() => {
                setShowPanel(true);
                setActiveField("dropoff");
              }}
            />
            <button
              type="submit"
              className="
            bg-black text-white p-3 rounded-lg mt-3 font-semibold text-xl
            hover:bg-gray-800
            transition duration-200 ease-in-out w-full"
            >
              Find Rides
            </button>
          </form>
        </div>
        <Location
          panelRef={panelRef}
          setPickup={setPickup}
          setDropoff={setDropoff}
          activeField={activeField}
          suggestions={
            activeField === "pickup" ? pickUpSuggestions : dropOffSuggestions // conditional rendering of suggestions based on active field
          }
        />
      </div>
      <ChooseRides
        fare={fare}
        setVehicleType={setVehicleType}
        vehiclePanelRef={vehiclePanelRef}
        setVehiclePanel={setVehiclePanel}
        setSelectedRidePanel={setSelectedRidePanel}
      />
      <SelectedRide
        vehicleType={vehicleType}
        fare={fare}
        pickup={pickup}
        dropoff={dropoff}
        createRide={handleCreateRide}
        selectedRideRef={selectedRideRef}
        setSelectedRidePanel={setSelectedRidePanel}
        setVehiclePanel={setVehiclePanel}
      />
      <SearchingDrivers
        pickup={pickup}
        dropoff={dropoff}
        fare={fare}
        vehicleType={vehicleType}
        searchingDriversRef={searchingDriversRef}
        setSearchingDriversPanel={setSearchingDriversPanel}
        setSelectedRidePanel={setSelectedRidePanel}
        setWaitingForDriverPanel={setWaitingForDriverPanel}
      />
      <WaitingForDriver
        waitingForDriverRef={waitingForDriverRef}
        setWaitingForDriverPanel={setWaitingForDriverPanel}
        setSearchingDriversPanel={setSearchingDriversPanel}
      />
    </div>
  );
}
