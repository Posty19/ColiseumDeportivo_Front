import { createContext, useEffect, useState /* useMemo */ } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    if (localStorage.getItem(user)) setUser(localStorage.getItem(user));
  });

  const saveUser = (usu) => {
    localStorage.setItem("user", usu);
    setUser(usu);
  };

  /*
        views
        datos del usuario
        lista articulos - titulo subtitulo id
        lista personajes - nombre foto id tipo
        Comentarios??
    */

  return (
    <GlobalContext.Provider value={{ user, saveUser }}>
      {children}
    </GlobalContext.Provider>
  );
};
