import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// The createRoot function is used to create a root for the application. The createRoot function takes a DOM element as an argument and returns a root object. The render method of the root object is used to render the application.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Wrap App in browser routes */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
