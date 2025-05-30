import { Children } from "react";

import Field from "../Field/Field";
import Button from "../Button/Button";
const forms = {
  newUser: [
    { type: "text", name: "name", placeHolder: "Nombre" },
    { type: "text", name: "lastName", placeHolder: "Apellidos" },
    { type: "email", name: "email", placeHolder: "Correo electrónico" },
    { type: "password", name: "password", placeHolder: "Contraseña" },
  ],
};
const Form = ({ type }) => {
  return (
    <form action="">
      {forms[type].map((fieldAttrs) => {
        return (
          <Field atrs={fieldAttrs} key={fieldAttrs.name}>
            {Children}
          </Field>
        );
      })}
      {type === "newUser" || type === "updateUser" ? 
      <select name="role">
        {type==='newUser'?<option value="">Seleccion un rol</option>:null}
        <option value="admin">Admin</option>
        <option value="user">Usuario comun</option>
      </select> : null}
      <Button type={"cancel"} fn={type}></Button>
    </form>
  );
};
export default Form;
