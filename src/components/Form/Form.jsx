import { useState, useEffect } from "react";

import Field from "../Field/Field";
import Button from "../Button/Button";

const forms = {
  user: [
    { type: "text", name: "name", placeHolder: "Nombre" },
    { type: "text", name: "lastName", placeHolder: "Apellidos" },
    { type: "email", name: "email", placeHolder: "Correo electrónico" },
    { type: "password", name: "password", placeHolder: "Contraseña" },
  ],
};
const formsWihtoutCancel = ["contact"];

const Form = ({ children, type, fn, onSubmit, updtElement }) => {
  const [formData, setData] = useState({});

  useEffect(() => {
    if (updtElement) {
      setData(updtElement);
    }
  }, [updtElement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      {forms[type].map((fieldAttrs) => (
        <Field
          atrs={fieldAttrs}
          key={fieldAttrs.name}
          value={formData[fieldAttrs.name] || ""}
          change={handleChange}
        >
          {children}
        </Field>
      ))}
      {type === "user" ? (
        <select name="role" onChange={handleChange} value={formData['role'] || ""}>
          {type === "user" ? <option value="">Selecciona un rol</option> : null}
          <option value="admin">Admin</option>
          <option value="user">Usuario comun</option>
        </select>
      ) : null}
      <Button type={"submit"} txt={"save"} disabled={onSubmit?.isLoading} />
      {!formsWihtoutCancel.includes(type) ? (
        <Button type={"cancel"} txt={"cancel"} fn={fn} />
      ) : null}
    </form>
  );
};
export default Form;
