import {  createContext, useReducer,/* useMemo */ } from "react";

export const GlobalContext = createContext();

const initialValue = {
    newUser:false,
}

const reducer = (state,action)=>{
    switch (action.type){
        case 'newUser':
            console.log('cambio user');
            return {...state,newUser:!state.newUser};
        default:
            return state = {
                newUser:false
            };

    }
}

export const GlobalProvider = ({children})=>{


    const [state,dispatch] = useReducer(reducer,initialValue)

    /*
        views
        datos del usuario
        lista articulos - titulo subtitulo id
        lista personajes - nombre foto id tipo
        Comentarios??
    */

    return(
        <GlobalContext.Provider value={{state,dispatch}}>
            {children}
        </GlobalContext.Provider>
    )
}