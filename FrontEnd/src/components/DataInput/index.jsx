import React, { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";

const DataInput = forwardRef(({ value, onClick }, ref) => {
  return (
    <div
      className="calendario d-flex justify-content-center align-items-center text-center"
      onClick={onClick}
      ref={ref}
    >
      <div className="col-9 pe-3">{value}</div>
      <FontAwesomeIcon className="icon" icon={faCalendar} />
    </div>
  );
});

export default DataInput;
