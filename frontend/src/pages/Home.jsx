import homeImage from "../assets/get-started.png";
import { Link } from "react-router-dom";

// Main Home page component
export default function Home() {
  return (
    <div
      className="h-screen w-full flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${homeImage})` }}
    >
      <div className="bg-black h-full w-full bg-opacity-40 flex flex-col">
        {/* Header */}
        <header className="text-black p-4 flex justify-between items-center">
          <div className="text-3xl font-bold">Uber</div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome</h1>
          <p className="text-xl text-white mb-8">
            Get a ride in minutes with the Uber app
          </p>
          <Link
            to={"/login"}
            className="bg-white text-black px-6 py-3 rounded-full mb-8 font-bold text-xl"
          >
            Get Started
          </Link>
        </main>
      </div>
    </div>
  );
}
