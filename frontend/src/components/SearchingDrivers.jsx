import { XIcon, MapPinIcon, LocateIcon, CreditCardIcon } from "lucide-react";
import PropTypes from "prop-types";

// prop types
SearchingDrivers.propTypes = {
  setSearchingDriversPanel: PropTypes.func.isRequired,
  searchingDriversRef: PropTypes.object.isRequired,
  setSelectedRidePanel: PropTypes.func.isRequired,
  setWaitingForDriverPanel: PropTypes.func.isRequired,
};

// component
export default function SearchingDrivers({
  setSearchingDriversPanel,
  searchingDriversRef,
  setSelectedRidePanel,
  setWaitingForDriverPanel,
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
            <p>
              <h3 className="text-lg font-semibold">₹100</h3>
              <h4 className="text-sm text-gray-500">Cash</h4>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
