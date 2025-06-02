import {  createContext, useState,/* useMemo */ } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({children})=>{

    const [user,setUser] = useState({});
    const [token,setToken] = useState('');
    

    const saveUser = (usu)=>setUser(usu);


    /*
        views
        datos del usuario
        lista articulos - titulo subtitulo id
        lista personajes - nombre foto id tipo
        Comentarios??
    */

    return(
        <GlobalContext.Provider value={{user,saveUser,token,setToken}}>
            {children}
        </GlobalContext.Provider>
    )
}