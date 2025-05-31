
import './Button.css'

const Button=({type,fn,disabled = false,txt})=>{

    return <button 
        disabled={disabled}
        className={type}
        onClick={fn}
    >{txt}</button>
}
export default Button;