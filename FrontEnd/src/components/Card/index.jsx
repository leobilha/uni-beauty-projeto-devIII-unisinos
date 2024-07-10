import React from 'react';
import "./style.scss";

const Card = (props) => {
  return (
    <div className="card">
      <div className="box-img">
        <img src={props.picture} />
      </div>
      <div className="box-texto">
        <p>
          <strong>Nome:</strong>&nbsp; {props.name}
        </p>
        <p>
          <strong>EAN:</strong>&nbsp; {props.ean}{" "}
        </p>
        <p>
          <strong>Descrição:</strong>&nbsp; {props.fullname}
        </p>
        <p>
          <strong>Preço:</strong>&nbsp;R$ {props.price}
        </p>
      </div>
    </div>
  );
};

export default Card;
