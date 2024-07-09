import React from "react";

import manutencao from "../../assets/img/manutencao.svg"

import "./styles.scss";

const FalhaAutenticacao = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className='d-flex justify-content-center align-items-center pt-5'>
            <div className="container-manutencao">
              <div className="container-manutencao__text text-center">
                <h1><b>Estamos em Mantenção!</b></h1>
                <ul>
                  <li>Voltaremos em breve!</li>
                </ul>
              </div>

              <div className="d-flex justify-content-between">
                <img className="manutencao_img" draggable="false" src={manutencao} alt="Site fora do ar" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FalhaAutenticacao;
