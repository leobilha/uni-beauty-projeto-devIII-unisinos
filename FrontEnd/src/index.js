import React from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./globals/AuthContext";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "intro.js/introjs.css";
import "./globals/commons.scss";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
