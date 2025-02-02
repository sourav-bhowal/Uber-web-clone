import { CreditCardIcon, LocateIcon, MapPinIcon, XIcon } from "lucide-react";
import PropTypes from "prop-types";

// SelectedRide.propTypes is a prop type for the SelectedRide component
SelectedRide.propTypes = {
  createRide: PropTypes.func.isRequired,
  dropoff: PropTypes.string.isRequired,
  fare: PropTypes.object.isRequired,
  pickup: PropTypes.string.isRequired,
  selectedRideRef: PropTypes.object,
  setVehiclePanel: PropTypes.func.isRequired,
  setSelectedRidePanel: PropTypes.func.isRequired,
  vehicleType: PropTypes.string,
};

// SelectedRide is a component that displays the selected ride
export default function SelectedRide({
  setSelectedRidePanel,
  setVehiclePanel,
  selectedRideRef,
  createRide,
  fare,
  vehicleType,
  pickup,
  dropoff,
}) {
  return (
    <div
      className="fixed bottom-0 bg-white px-3 py-8 w-full translate-y-full"
      ref={selectedRideRef}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Selected Ride</h2>
        <XIcon
          size={20}
          onClick={() => {
            setSelectedRidePanel(false);
            setVehiclePanel(true);
          }}
        />
      </div>
      <div className="flex flex-col justify-between items-center gap-4 px-4">
        <img
          className="h-24"
          src={
            "https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          }
          alt={"car"}
        />
        <div className="w-full h-[1px] bg-gray-300 mx-auto" />
        <div className="w-full flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <MapPinIcon size={20} />
            <div>
              <h3 className="text-lg font-semibold">Pickup</h3>
              <h4 className="text-sm text-gray-500">{pickup}</h4>
            </div>
          </div>
          <div className="w-[88%] h-[1px] bg-gray-300 mx-auto" />
          <div className="flex items-center gap-2">
            <LocateIcon size={20} />
            <div>
              <h3 className="text-lg font-semibold">Dropoff</h3>
              <h4 className="text-sm text-gray-500">{dropoff}</h4>
            </div>
          </div>
          <div className="w-[88%] h-[1px] bg-gray-300 mx-auto" />
          <div className="flex items-center gap-2">
            <CreditCardIcon size={20} />
            <div>
              <h3 className="text-lg font-semibold">₹{fare[vehicleType]}</h3>
              <h4 className="text-sm text-gray-500">Cash</h4>
            </div>
          </div>
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
          onClick={createRide}
        >
          Confirm Ride
        </button>
      </div>
    </div>
  );
}
