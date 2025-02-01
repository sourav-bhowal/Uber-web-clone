import { User2Icon } from "lucide-react";
import { XIcon } from "lucide-react";
import PropTypes from "prop-types";

// ChooseRides.propTypes is a prop type for the ChooseRides component
ChooseRides.propTypes = {
  fare: PropTypes.object,
  setVehicleType: PropTypes.func.isRequired,
  vehiclePanelRef: PropTypes.object,
  setVehiclePanel: PropTypes.func.isRequired,
  setSelectedRidePanel: PropTypes.func.isRequired,
};

// ChooseRides is a component that displays the available rides and allows the user to choose a ride
export default function ChooseRides({
  vehiclePanelRef,
  setVehiclePanel,
  fare,
  setVehicleType,
  setSelectedRidePanel,
}) {
  // ChooseRides is a component that displays the available rides and allows the user to choose a ride
  const vehicles = [
    {
      name: "Uber Go",
      vehicleType: "car",
      price: fare.car,
      capacity: 4,
      image: "https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png",
      distance: "2 mins away",
      description: "Affordable rides",
    },
    {
      name: "Uber Auto",
      vehicleType: "auto",
      price: fare.auto,
      capacity: 3,
      image:
        "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png",
      distance: "7 mins away",
      description: "Affordable rides",
    },
    {
      name: "Uber Moto",
      vehicleType: "moto",
      price: fare.moto,
      capacity: 1,
      image:
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
      distance: "3 mins away",
      description: "Affordable bike rides",
    },
  ];

  // return the ChooseRides component
  return (
    <div
      className="fixed z-10 bottom-0 bg-white px-3 py-8 w-full translate-y-full"
      ref={vehiclePanelRef}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Choose your ride</h2>
        <XIcon
          size={20}
          onClick={() => {
            setVehiclePanel(false);
          }}
        />
      </div>
      {vehicles.map((vehicle, index) => (
        <div
          className="flex items-center justify-between p-2 mb-2 rounded-2xl bg-gray-200 w-full border-2 active:border-black"
          key={index}
          onClick={() => {
            setVehiclePanel(false);
            setSelectedRidePanel(true);
            setVehicleType(vehicle.vehicleType);
          }}
        >
          <img className="h-14" src={vehicle.image} alt="car" />
          <div className="w-1/2">
            <h3 className="flex gap-2 items-center">
              <p className="text-lg font-semibold">{vehicle.name}</p>
              <p className="flex">
                <User2Icon size={20} /> {vehicle.capacity}
              </p>
            </h3>
            <h4>{vehicle.distance}</h4>
            <p>{vehicle.description}</p>
          </div>
          <h2 className="text-2xl font-semibold">₹{vehicle.price}</h2>
        </div>
      ))}
    </div>
  );
}
