import PropTypes from "prop-types";

// locations array
const locations = [
  {
    address: "123 Main St. Park Street, Near KFC, New York, USA",
  },
  {
    address: "456 Main St. Park Street, Near McDonalds, New York, USA",
  },
  {
    address: "789 Main St. Park Street, Near Burger King, New York, USA",
  },
];

// Location.propTypes is a prop type for the Location component
Location.propTypes = {
  setShowPanel: PropTypes.func.isRequired,
  setVehiclePanel: PropTypes.func.isRequired,
  panelRef: PropTypes.object,
};

// Location is a component that displays the available locations and allows the user to choose a location
export default function Location({ setShowPanel, setVehiclePanel, panelRef }) {
  return (
    <div className="flex flex-col gap-2 h-0 bg-white p-5" ref={panelRef}>
      {locations.map((location, index) => (
        <div
          className="flex items-center gap-4 my-4 justify-start bg-gray-100 p-3 rounded-xl border-2"
          key={index}
          onClick={() => {
            setShowPanel(false);
            setVehiclePanel(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          <p className="font-medium">{location.address}</p>
        </div>
      ))}
    </div>
  );
}
