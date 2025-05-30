
const Field = ({atrs}) =>{

    console.log(atrs);

    return(
        <div className="formField">
            <label htmlFor={atrs.name}>{atrs.placeHolder}</label>
            <input type={atrs.type} id={atrs.name} placeholder={atrs.placeHolder} name={atrs.name}/>
        </div>
    )

}

export default Field;