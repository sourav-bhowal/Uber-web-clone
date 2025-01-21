import PropTypes from "prop-types";
import { CreditCardIcon, LocateIcon, MapPinIcon, XIcon } from "lucide-react";

// SelectedRide is a component that displays the selected ride
SelectedRide.propTypes = {
  setSelectedRidePanel: PropTypes.func.isRequired,
  setVehiclePanel: PropTypes.func.isRequired,
  selectedRideRef: PropTypes.object,
  setSearchingDriversPanel: PropTypes.func.isRequired,
};

// SelectedRide is a component that displays the selected ride
export default function SelectedRide({
  setSelectedRidePanel,
  setVehiclePanel,
  selectedRideRef,
  setSearchingDriversPanel,
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
              <h3 className="text-lg font-semibold">562/22-C</h3>
              <h4 className="text-sm text-gray-500">Kolkata, West Bengal</h4>
            </div>
          </div>
          <div className="w-[88%] h-[1px] bg-gray-300 mx-auto" />
          <div className="flex items-center gap-2">
            <LocateIcon size={20} />
            <div>
              <h3 className="text-lg font-semibold">Second Street</h3>
              <h4 className="text-sm text-gray-500">
                1st Sector, Hari Nagar, New Delhi, Delhi 110014
              </h4>
            </div>
          </div>
          <div className="w-[88%] h-[1px] bg-gray-300 mx-auto" />
          <div className="flex items-center gap-2">
            <CreditCardIcon size={20} />
            <div>
              <h3 className="text-lg font-semibold">₹100</h3>
              <h4 className="text-sm text-gray-500">Cash</h4>
            </div>
          </div>
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
          onClick={() => {
            setSearchingDriversPanel(true);
            setSelectedRidePanel(false);
          }}
        >
          Confirm Ride
        </button>
      </div>
    </div>
  );
}
