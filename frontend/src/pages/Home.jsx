import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Location from "../components/Location";

// Home page
export default function Home() {
  // states
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [showPanel, setShowPanel] = useState(false);

  // refs
  const panelRef = useRef(null);

  // gsap
  useGSAP(
    function () {
      if (showPanel) {
        gsap.to(panelRef.current, {
          height: "70%",
          duration: 0.5,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0",
          duration: 0.5,
        });
      }
    },
    [showPanel] // dependency array for gsap
  );

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className="relative h-screen">
      <h2 className="text-3xl font-bold absolute top-5 left-5">Uber</h2>
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-suboptimal.jpg"
        />
      </div>
      <div className="absolute flex justify-end flex-col w-full top-0 h-screen">
        <div className="h-[30%] p-5 bg-white relative">
          <div className="flex justify-between">
            <h3 className="text-2xl font-semibold">Find a trip</h3>
            {showPanel && (
              <button
                className="bg-black text-white p-1 rounded-lg"
                onClick={() => setShowPanel(false)}
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
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="line absolute h-16 w-1 left-10 top-1/3 bg-gray-700 rounded-full"></div>
            <input
              className="bg-[#eee] px-12 py-4 rounded-lg w-full mt-3"
              type="text"
              placeholder="Add your pickup location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              onClick={() => setShowPanel(true)}
            />
            <input
              className="bg-[#eee] px-12 py-4 rounded-lg w-full"
              type="text"
              placeholder="Add your dropoff location"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              onClick={() => setShowPanel(true)}
            />
          </form>
        </div>
        <div
          ref={panelRef} // ref for gsap
          className="h-0 bg-white px-14"
        >
          <Location />
        </div>
      </div>
    </div>
  );
}
