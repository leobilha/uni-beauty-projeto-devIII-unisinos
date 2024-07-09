import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const [accesses, setAccesses] = useState([]);
  const [holder, setHolder] = useState([]);
  const [accessToken, setAccessToken] = useState([]);
  const [authenticationMethod, setAuthenticationMethod] = useState([]);
  const [autenticated, setAutenticated] = useState(false);
  const [isLoadingCertificate, setIsLoadingCertificate] = useState(false);
  const [pageName, setPageName] = useState("");
  const [isShowModalAuth, setIsShowModalAuth] = useState(false);
  const [authenticatedCpf, setAuthenticatedCpf] = useState("");

  const oidRoot = "1.3.6.1.4.1.12129.9";

  return (
    <AuthContext.Provider
      value={{
        accesses,
        setAccesses,
        oidRoot,
        holder,
        setHolder,
        accessToken,
        setAccessToken,
        authenticationMethod,
        setAuthenticationMethod,
        autenticated,
        setAutenticated,
        isLoadingCertificate,
        setIsLoadingCertificate,
        pageName,
        setPageName,
        isShowModalAuth,
        setIsShowModalAuth,
        authenticatedCpf, 
        setAuthenticatedCpf, 
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};


