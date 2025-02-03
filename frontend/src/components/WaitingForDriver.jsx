import PropTypes from "prop-types";
import {
  MapPinIcon,
  LocateIcon,
  CreditCardIcon,
  CheckIcon,
} from "lucide-react";

// prop types
WaitingForDriver.propTypes = {
  waitingForDriverRef: PropTypes.object.isRequired,
  setWaitingForDriverPanel: PropTypes.func.isRequired,
  setSearchingDriversPanel: PropTypes.func.isRequired,
  ride: PropTypes.object,
};

// component
export default function WaitingForDriver({
  waitingForDriverRef,
  setWaitingForDriverPanel,
  setSearchingDriversPanel,
  ride,
}) {
  return (
    <div
      className="fixed bottom-0 bg-white px-3 py-8 w-full translate-y-full"
      ref={waitingForDriverRef}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Waiting for Driver</h2>
      </div>
      <div className="flex justify-between items-center px-4 mb-6">
        <img
          className="h-24 relative"
          src={
            "https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          }
          alt={"car"}
        />
        <div className="flex flex-col gap-2 items-end">
          <h2 className="text-lg font-semibold text-gray-500">
            {ride?.captainId?.fullName.firstName +
              " " +
              ride?.captainId?.fullName.lastName}
          </h2>
          <h3 className="text-xl font-bold">
            {ride?.captainId?.vehicle.plateNumber}
          </h3>
          <h4 className="text-sm text-gray-500">
            {ride?.captainId?.vehicle.color}
          </h4>
          <p className="text-lg font-bold text-gray-500">OTP: {ride?.otp}</p>
          <h5>
            {/* {
              ride?.timeToReachPickup?.duration + " away" 
            } */}
          </h5>
          <h3 className="text-sm text-green-500 flex gap-2 font-semibold items-center">
            <CheckIcon size={20} />
            Verified
          </h3>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-300 mx-auto" />
      <div className="w-full flex flex-col gap-3 mt-6 px-4">
        <div className="flex items-center gap-2">
          <MapPinIcon size={20} />
          <div>
            <h3 className="text-lg font-semibold">Pickup</h3>
            <h4 className="text-sm text-gray-500 ">{ride?.pickup}</h4>
          </div>
        </div>
        <div className="w-[88%] h-[1px] bg-gray-300 mx-auto" />
        <div className="flex items-center gap-2">
          <LocateIcon size={20} />
          <div>
            <h3 className="text-lg font-semibold">Dropoff</h3>
            <h4 className="text-sm text-gray-500">{ride?.destination}</h4>
          </div>
        </div>
        <div className="w-[88%] h-[1px] bg-gray-300 mx-auto" />
        <div className="flex items-center gap-2">
          <CreditCardIcon size={20} />
          <div>
            <h3 className="text-lg font-semibold">₹{ride?.fare}</h3>
            <h4 className="text-sm text-gray-500">Cash</h4>
          </div>
        </div>
      </div>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md w-full mt-6"
        onClick={() => {
          setWaitingForDriverPanel(false);
          setSearchingDriversPanel(true);
        }}
      >
        Cancel Ride
      </button>
    </div>
  );
}
