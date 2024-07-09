import React from "react";
import "./style.scss";

const Loader = () => {
  return (
    <div className="text-center" id="loader-custom">
      <div role="status" className="spinner-border">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
