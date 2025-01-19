import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignUp";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignUp from "./pages/CaptainSignUp";
import GetStarted from "./pages/GetStarted";

// App component is the root component of the application. It is the parent component of all other components. It is the first component that gets rendered when the application starts.
export default function App() {
  return (
    <div>
      {/* Routes */}
      <Routes>
        {/* Route */}
        <Route path="/" element={<GetStarted />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />
      </Routes>
    </div>
  );
}
