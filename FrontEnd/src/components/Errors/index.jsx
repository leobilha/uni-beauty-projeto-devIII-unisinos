import React from "react";
import brokenEgg from "../../assets/img/OvvoQuebrado.png";

const Erro404 = () => {
  return (
    <div className="text-center py-5">
      <h2 className="fw-bold text-uppercase">
        <img src={brokenEgg} alt="quebrou" className="mb-5" /> <br />
        Página não encontrada
      </h2>
    </div>
  );
};

export default Erro404;
