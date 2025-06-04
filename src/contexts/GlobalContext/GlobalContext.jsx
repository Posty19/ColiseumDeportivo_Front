import { createContext, useState /* useMemo */ } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [articles,setArticles] = useState([]);
  const [notables,setNotables] = useState([]);

  const saveUser = (usu) => {;
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
    <GlobalContext.Provider value={{ user, saveUser,articles,setArticles,notables,setNotables }}>
      {children}
    </GlobalContext.Provider>
  );
};
