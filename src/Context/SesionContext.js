import React, { useState, useEffect, createContext } from "react";

export const SesionContext = createContext();

export const endpoint = "https://api.frame-shamir.com/armcio"
//"http://localhost:50427/armcio";

export const SesionProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [usuario, setUsuario] = useState(null);

  const setProfile = (token) => {
    if (token)
      fetch(`${endpoint}/crud-readToken`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) =>
          res.status === 200
            ? res.json()
            : () => {
                setUsuario(null);
                setToken(null);
              }
        )
        .then((res) => {
          setUsuario(res);
        })
        .catch((err) => {
          setUsuario(null);
          console.log(err);
        });
    else setUsuario(null);
  };

  useEffect(() => {
    setProfile(token);
  }, []);

  useEffect(() => {
    setProfile(token);
  }, [token]);

  return (
    <SesionContext.Provider value={{ token, usuario, setToken, setUsuario }}>
      {children}
    </SesionContext.Provider>
  );
};
