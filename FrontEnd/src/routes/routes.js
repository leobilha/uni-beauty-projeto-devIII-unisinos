import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../globals/AuthContext";

// Páginas
import SignInSide from "../pages/SignInSide";
import SignUpSide from "../pages/SignUpSide";
import Dashboard from "../pages/Dashboard";
import Purchase from "../pages/Purchase";

const Router = () => {
  const { autenticated } = useContext(AuthContext);

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
            <Route path="/purchase" element={<Purchase  />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </main>
  );
};

export default Router;



