import React from "react";
import Routes from "./routes/routes";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer position="top-center" theme="colored" limit={1} />
      <Routes />
    </>
  );
};

export default App;
