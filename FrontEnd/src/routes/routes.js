import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas
import SignInSide from "../pages/SignInSide";
import SignUpSide from "../pages/SignUpSide";
import Dashboard from "../pages/Dashboard";
import Purchase from "../pages/Purchase";
import Checkout from "../pages/Checkout";

const Router = () => {
  return (
    <main>
      <div id="raiz"></div>

      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<SignInSide />} />
            <Route path="/login" element={<SignInSide />} />
            <Route path="/criar" element={<SignUpSide />} />
            <Route path="/dashboard" element={<Dashboard  />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </main>
  );
};

export default Router;



