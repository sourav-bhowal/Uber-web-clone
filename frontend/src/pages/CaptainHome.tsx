import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { HomeIcon } from "lucide-react";
import React from "react";

// Captain Home Page
const CaptainHome = () => {
  // State variables
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);

  // Refs
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  // Context variables
  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  // UseEffect to update the captain's location
  useEffect(() => {
    // If captain is not available, return
    if (!captain?._id) return;

    // Emit join event to join the captain to the socket room
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });

    // Function to update the captain's location and emit it to the server
    const updateLocation = () => {
      if (navigator.geolocation) {
        // Get the current location of the captain
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(
            "ltd:" + position.coords.latitude,
            "lng:" + position.coords.longitude
          );
          // Emit the update-location-captain event to the server
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    // Update the captain's location every 10 seconds
    const locationInterval = setInterval(updateLocation, 10000);

    // Call the updateLocation function
    updateLocation();

    // Clear the interval when the component unmounts so that the location is not updated
    return () => clearInterval(locationInterval);
  }, [socket, captain?._id]);

  // Listen for new-ride event and set the ride state
  socket.on("new-ride", (data) => {
    // Set the ride state and show the ride popup panel
    setRide(data);
    setRidePopupPanel(true);
  });

  // Function to confirm a ride
  async function confirmRide() {
    if (!ride || !captain) return;
    // 
    const response = await axios.post(
      `http://localhost:5000/api/rides/confirm-ride`,
      {
        rideId: (ride as any)?._id,
        captainId: captain?._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token-captain")}`,
        },
      }
    );
    setRidePopupPanel(false);
    setConfirmRidePopupPanel(true);
  }

  // GSAP animations
  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopupPanel]
  );

  // Return the Captain Home Page
  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/captain-home"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <HomeIcon className="h-6 w-6" />
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
