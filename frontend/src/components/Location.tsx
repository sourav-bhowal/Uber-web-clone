import React from "react";

const locations = [
  {
    name: "Location 1",
    address: "123 Main St, Anytown, USA",
  },
  {
    name: "Location 2",
    address: "456 Main St, Anytown, USA",
  },
  {
    name: "Location 3",
    address: "789 Main St, Anytown, USA",
  },
];

export default function Location() {
  return (
    <div className="flex flex-col gap-2">
      {locations.map((location) => (
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h3>{location.name}</h3>
            <p>{location.address}</p>
          </div>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
