/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // Submit handler for the form
  const submitHander = async (e) => {
    e.preventDefault();

    // Send a request to the server to start the ride
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
      {
        params: {
          rideId: props.ride.rideDetails._id, // ride id
          otp: otp, // otp
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token-captain")}`,
        },
      }
    );
    // If the response status is 200, set the confirm ride popup panel to false and navigate to the captain riding page
    if (response.status === 200) {
      props.setConfirmRidePopupPanel(false);
      props.setRidePopupPanel(false);
      navigate("/captain-riding", { state: { ride: props.ride.rideDetails } }); // navigate to the captain riding page with the ride data
    }
  };

  // Return the ConfirmRidePopUp component
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setRidePopupPanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">
        Confirm this ride to Start
      </h3>
      <div className="flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 rounded-full object-cover w-12"
            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium capitalize">
            {props.ride?.rideDetails.userId.fullName.firstName}{" "}
            {props.ride?.rideDetails.userId.fullName.lastName}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">
          {props.ride?.timeToReachPickup?.distance +
            " | " +
            props.ride?.timeToReachPickup?.duration}
        </h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.rideDetails.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Dropoff</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.rideDetails.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-road-map-line"></i>
            <div>
              <h3 className="text-lg font-medium flex items-center gap-1">
                <i className="ri-road-map-line"></i>
                Distance & Time
              </h3>
              <p className="text-sm mt-1 text-gray-600">
                {props.ride?.pickupToDestinationDistanceTime?.distance +
                  " | " +
                  props.ride?.pickupToDestinationDistanceTime?.duration}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">
                ₹{props.ride?.rideDetails.fare}{" "}
              </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <form onSubmit={submitHander}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3"
              placeholder="Enter OTP"
            />

            <button className="w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg">
              Confirm
            </button>
            <button
              onClick={() => {
                props.setConfirmRidePopupPanel(false);
                props.setRidePopupPanel(false);
              }}
              className="w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
