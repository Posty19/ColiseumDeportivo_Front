import { useContext } from 'react';

import './Button.css'
import { GlobalContext } from '../../contexts/GlobalContext/GlobalContext';

const Button=({/* id, */type,/* dataType, */fn})=>{

    const {dispatch} = useContext(GlobalContext);
    return <button 
        className={type}
        onClick={()=>dispatch({type:fn})}
    >{type}</button>
}
export default Button;