import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Location from "../components/Location";
import ChooseRides from "../components/ChooseRides";
import SelectedRide from "../components/SelectedRide";
import SearchingDrivers from "../components/SearchingDrivers";
import WaitingForDriver from "../components/WaitingForDriver";

// Home page
export default function Home() {
  // states
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [showPanel, setShowPanel] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [selectedRidePanel, setSelectedRidePanel] = useState(false);
  const [searchingDriversPanel, setSearchingDriversPanel] = useState(false);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);

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

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

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
        <div className="h-[30%] p-5 bg-white relative">
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="line absolute h-16 w-1 left-10 top-1/3 bg-gray-700 rounded-full"></div>
            <input
              className="bg-[#eee] px-12 py-4 rounded-lg w-full mt-3"
              type="text"
              placeholder="Add your pickup location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              onClick={() => setShowPanel(true)}
            />
            <input
              className="bg-[#eee] px-12 py-4 rounded-lg w-full"
              type="text"
              placeholder="Add your dropoff location"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              onClick={() => setShowPanel(true)}
            />
          </form>
        </div>
        <Location
          setShowPanel={setShowPanel}
          setVehiclePanel={setVehiclePanel}
          panelRef={panelRef}
        />
      </div>
      <ChooseRides
        vehiclePanelRef={vehiclePanelRef}
        setShowPanel={setShowPanel}
        setVehiclePanel={setVehiclePanel}
        setSelectedRidePanel={setSelectedRidePanel}
      />
      <SelectedRide
        selectedRideRef={selectedRideRef}
        setSelectedRidePanel={setSelectedRidePanel}
        setVehiclePanel={setVehiclePanel}
        setSearchingDriversPanel={setSearchingDriversPanel}
      />
      <SearchingDrivers
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
