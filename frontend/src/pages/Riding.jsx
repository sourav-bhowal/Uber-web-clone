import { CheckIcon, LocateIcon, CreditCardIcon, HomeIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";

// Riding Page
export default function Riding() {
  const location = useLocation();
  // Retrieve ride data from location state
  const { ride } = location.state || {}; // Retrieve ride data
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  // When the ride is ended, navigate to the home page
  socket.on("ride-ended", () => {
    navigate("/home");
  });

  // Return the Riding component
  return (
    <div className="h-screen">
      <HomeIcon
        size={40}
        className="absolute top-5 left-5 bg-white rounded-full p-2"
        onClick={() => navigate("/home")}
      />
      <div className="h-1/2">
        <LiveTracking />
      </div>
      <div className="h-1/2 bg-white p-5 flex flex-col gap-10">
        <div className="flex justify-between items-center px-4">
          <img
            className="h-24 relative"
            src={
              "https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
            }
            alt={"car"}
          />
          <div className="flex flex-col gap-2 items-end">
            <h2 className="text-lg font-semibold text-gray-500">
              {ride?.captainId?.fullName.firstName}{" "}
              {ride?.captainId?.fullName.lastName}
            </h2>
            <h3 className="text-xl font-bold">
              {ride?.captainId?.vehicle.plateNumber}
            </h3>
            <h4 className="text-sm text-gray-500">
              {ride?.captainId?.vehicle.color}
            </h4>
            <h3 className="text-sm text-green-500 flex gap-2 font-semibold items-center">
              <CheckIcon size={20} />
              Verified
            </h3>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-300 mx-auto" />
        <div className="w-full flex flex-col gap-3 px-4">
          <div className="flex items-center gap-2">
            <LocateIcon size={20} />
            <div>
              <h3 className="text-lg font-semibold">Destination</h3>
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
        <button className="bg-black text-white px-4 py-2 rounded-md w-full">
          Reached Destination
        </button>
      </div>
    </div>
  );
}
