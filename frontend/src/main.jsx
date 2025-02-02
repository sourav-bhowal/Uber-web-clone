import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext.jsx";
import CaptainContext from "./context/CaptainContext.jsx";
import "./index.css";
import App from "./App.jsx";
import SocketProvider from "./context/SocketContext.jsx";

// The createRoot function is used to create a root for the application. The createRoot function takes a DOM element as an argument and returns a root object. The render method of the root object is used to render the application.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CaptainContext>
      {/* Wrap in Captain Context to pass captain value everywhere */}
      <UserContext>
        {/* Wrap in User Context to pass user value everywhere */}
        <SocketProvider>
          {/* Wrap in Socket Provider to use socket.io */}
          <BrowserRouter>
            {/* Wrap in BrowserRouter to use routing */}
            <App />
          </BrowserRouter>
        </SocketProvider>
      </UserContext>
    </CaptainContext>
  </StrictMode>
);
