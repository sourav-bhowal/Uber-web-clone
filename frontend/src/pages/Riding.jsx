import { CheckIcon, LocateIcon, CreditCardIcon, HomeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Riding Page
export default function Riding() {
  const navigate = useNavigate();
  return (
    <div className="h-screen">
      <HomeIcon
        size={40}
        className="absolute top-5 left-5 bg-white rounded-full p-2"
        onClick={() => navigate("/home")}
      />
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-suboptimal.jpg"
        />
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
              Rajesh Kumar
            </h2>
            <h3 className="text-xl font-bold">AS-03-H545</h3>
            <h4 className="text-sm text-gray-500">Red Acura MDX</h4>
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
        <button className="bg-black text-white px-4 py-2 rounded-md w-full">
          Mark a Payment
        </button>
      </div>
    </div>
  );
}
