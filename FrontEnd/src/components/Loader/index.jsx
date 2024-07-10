import React from "react";
import "./style.scss";
import logo from "../../assets/img/icon_o.png";

const Loader = () => {
  return (
    <div className="text-center" id="loader-custom">
      <div className="d-flex flex-column align-items-center">
        <img src={logo} className="loaderLogo" />
        <span className="mt-4 text-white">Carregando...</span>
      </div>
    </div>
  );
};

export default Loader;
