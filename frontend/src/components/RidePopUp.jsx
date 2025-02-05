/* eslint-disable react/prop-types */

import { Clock, CreditCard, LocateFixed, MapPin } from "lucide-react";

const RidePopUp = (props) => {
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
      <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>
      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 rounded-full object-cover w-12"
            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {props?.ride?.rideDetails?.userId?.fullName?.firstName +
              " " +
              props?.ride?.rideDetails?.userId?.fullName?.lastName}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">
          {props?.ride?.timeToReachPickup?.distance +
            " | " +
            props.ride?.timeToReachPickup.duration}
        </h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center pl-3 pr-3">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <div>
              <h3 className="text-lg font-medium flex items-center gap-1">
                <MapPin size={20} className="mt-1"/>
                Pickup
              </h3>
              <p className="text-sm mt-1 text-gray-600">
                {props.ride?.rideDetails?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <div>
              <h3 className="text-lg font-medium flex items-center gap-1">
                <LocateFixed size={20} className="mt-1"/>
                Dropoff
              </h3>
              <p className="text-sm mt-1 text-gray-600">
                {props.ride?.rideDetails?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <div>
              <h3 className="text-lg font-medium flex items-center gap-1">
                <Clock size={20} className="mt-1"/>
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
            <div>
              <h3 className="text-lg font-medium flex items-center gap-1">
                <CreditCard size={20} className="mt-1"/>
                Fare
              </h3>
              <p className="text-sm mt-1 text-gray-600">
                {" "}
                ₹{props.ride?.rideDetails?.fare}{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 w-full ">
          <button
            onClick={() => {
              props.setConfirmRidePopupPanel(true);
              props.confirmRide();
            }}
            className=" bg-green-600 w-full text-white font-semibold p-2 px-10 rounded-lg"
          >
            Accept
          </button>

          <button
            onClick={() => {
              props.setRidePopupPanel(false);
            }}
            className="mt-2 w-full bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
