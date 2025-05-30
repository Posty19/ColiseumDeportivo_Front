import { Children, createContext,/* useReducer,useMemo */ } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({Children})=>{

    /*
        datos del usuario
        lista articulos - titulo subtitulo id
        lista personajes - nombre foto id tipo
        Comentarios??
    */

    return(
        <GlobalContext.Provider value={{}}>
            {Children}
        </GlobalContext.Provider>
    )
}