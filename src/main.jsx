// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx"; // Ensure this path is correct


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 



const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  
    <App />
  
);
