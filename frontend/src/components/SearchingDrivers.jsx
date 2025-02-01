import { XIcon, MapPinIcon, LocateIcon, CreditCardIcon } from "lucide-react";
import PropTypes from "prop-types";

// SearchingDrivers.propTypes is a prop type for the SearchingDrivers component
SearchingDrivers.propTypes = {
  dropoff: PropTypes.string.isRequired,
  fare: PropTypes.object,
  pickup: PropTypes.string.isRequired,
  searchingDriversRef: PropTypes.object,
  setSearchingDriversPanel: PropTypes.func.isRequired,
  setWaitingForDriverPanel: PropTypes.func.isRequired,
  setSelectedRidePanel: PropTypes.func.isRequired,
  vehicleType: PropTypes.string,
};

// component
export default function SearchingDrivers({
  setSearchingDriversPanel,
  searchingDriversRef,
  setSelectedRidePanel,
  setWaitingForDriverPanel,
  pickup,
  dropoff,
  fare,
  vehicleType,
}) {
  return (
    <div
      className="fixed bottom-0 bg-white px-3 py-8 w-full translate-y-full"
      ref={searchingDriversRef}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Looking for a driver</h2>
        <XIcon
          size={20}
          onClick={() => {
            setSearchingDriversPanel(false);
            setSelectedRidePanel(true);
          }}
        />
      </div>
      <div className="flex flex-col justify-between items-center gap-4 px-4">
        <div className="relative">
          <div className="absolute inset-0 -m-3 right-4 animate-pulse-ring rounded-full bg-blue-500/30" />
          <img
            className="h-24 relative mb-6"
            src={
              "https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
            }
            alt={"car"}
          />
        </div>

        <div className="w-full h-[1px] bg-gray-300 mx-auto" />
        <div className="w-full flex flex-col gap-3 px-4">
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
      </div>
    </div>
  );
}
