
import './Button.css'

const Button=({type,fn,disabled = false,txt})=>{

    return <button 
        type={type==='submit'?'submit':'button'}
        disabled={disabled}
        className={type}
        onClick={fn}
    >{txt}</button>
}
export default Button;