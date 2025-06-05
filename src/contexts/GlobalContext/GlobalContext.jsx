import { createContext, useState /* useMemo */ } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [articles,setArticles] = useState([]);
  const [notables,setNotables] = useState([]);

  const saveUser = (usu) => {;
    setUser(usu);
  };

  return (
    <GlobalContext.Provider value={{ user, saveUser,articles,setArticles,notables,setNotables }}>
      {children}
    </GlobalContext.Provider>
  );
};
