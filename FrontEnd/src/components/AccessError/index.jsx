import React, { useContext } from "react";
//Components
import { AuthContext } from "../../globals/AuthContext";

//assets
import ilustracaoErro from "../../assets/img/security_SVG.svg";

import "./styles.scss";

const AccessError = () => {
  const { accesses } = useContext(AuthContext);
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-center align-items-center pt-5">
            <div className="container-accessError">
              <div className="container-accessError__text">
                <h1 className="text-center">
                  <b>Parece que você não tem acesso a esta página!</b>
                </h1>
                <ul>
                  <li>{accesses.message}</li>
                  <li className="text-center">
                    <b>O acesso é somente via e-CPF.</b>
                  </li>
                  <li>
                    Tente reiniciar o navegador ou entre em contato com o
                    administrador e verifique suas permissões.
                  </li>
                </ul>
              </div>

              <div className="d-flex justify-content-between">
                <img
                  className="ilustracao__erro"
                  draggable="false"
                  src={ilustracaoErro}
                  alt="Alerta, usuário sem permissão de acessar a página."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessError;
