import PropTypes from "prop-types";

// Location.propTypes is a prop type for the Location component
Location.propTypes = {
  panelRef: PropTypes.object,
  suggestions: PropTypes.array,
  activeField: PropTypes.string,
  setPickup: PropTypes.func.isRequired,
  setDropoff: PropTypes.func.isRequired,
};

// Location is a component that displays the available locations and allows the user to choose a location
export default function Location({
  panelRef,
  suggestions,
  activeField,
  setPickup,
  setDropoff,
}) {
  // Handles the suggestion click
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion);
    } else if (activeField === "dropoff") {
      setDropoff(suggestion);
    }
  };

  return (
    <div className="flex flex-col gap-2 h-0 bg-white p-5 pointer-events-auto" ref={panelRef}>
      {suggestions.map((location, index) => (
        <div
          className="flex items-center gap-4 my-4 justify-start bg-gray-100 p-3 rounded-xl border-2 cursor-pointer"
          key={index}
          onClick={() => handleSuggestionClick(location)}
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
          <p className="font-medium">{location}</p>
        </div>
      ))}
    </div>
  );
}