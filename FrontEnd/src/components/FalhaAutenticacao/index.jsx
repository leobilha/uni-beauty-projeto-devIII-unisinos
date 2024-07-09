import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";

import falhaLogin from "../../assets/img/falhaLogin.svg";

import "./styles.scss";

const FalhaAutenticacao = ({ uriQrCode }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-center align-items-center pt-5">
            <div className="container-falhaLogin">
              <div className="container-falhaLogin__text text-center">
                <h1>
                  <b>Erro!</b>
                </h1>
                <ul>
                  <li>Certificado Digital ou SafeID não encontrado!</li>
                  <li>
                    Retire o certificado, insira novamente e reinicie o
                    navegador para realizar o login.
                  </li>
                  <button
                    title="SafeID"
                    className="btn btn-primary"
                    type="reset"
                    onClick={() => {
                      window.location.href = uriQrCode;
                    }}
                  >
                    <div className="input-group">
                      <div>
                        <FontAwesomeIcon icon={faCloud} size="lg" disabled />
                      </div>
                      <div style={{ marginLeft: "0.5rem" }}>
                        Autenticar via SafeID
                      </div>
                    </div>
                  </button>
                </ul>
              </div>

              <div className="d-flex justify-content-between">
                <img
                  className="falhaLogin_img"
                  draggable="false"
                  src={falhaLogin}
                  alt="Falha no login por causa do certificado digital."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FalhaAutenticacao;
