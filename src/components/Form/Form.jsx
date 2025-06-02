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
  article: [
    { type: "text", name: "title", placeHolder: "Títlulo" },
    { type: "text", name: "subTitle", placeHolder: "Subtítulo" },
    { type: "file", name: "file", placeHolder: "Imagen del artículo" },
  ],
  notable: [
    { type: "text", name: "name", placeHolder: "Nombre" },
    { type: "file", name: "file", placeHolder: "Imagen del personaje" },
  ],
  login: [
    { type: "email", name: "email", placeHolder: "Correo electrónico" },
    { type: "password", name: "password", placeHolder: "Contraseña" },
  ],
  register: [
    { type: "text", name: "name", placeHolder: "Nombre" },
    { type: "text", name: "lastName", placeHolder: "Apellidos" },
    { type: "email", name: "email", placeHolder: "Correo electrónico" },
    { type: "password", name: "password", placeHolder: "Contraseña" },
    {
      type: "password",
      name: "password2",
      placeHolder: "Repita la Contraseña",
    },
  ],
};
const formsWihtoutCancel = ["contact"];

const Form = ({ children, type, fn, onSubmit, updtElement, changeLogin }) => {
  const [formData, setData] = useState({});
  const [txtAreaName, setTxtAreaName] = useState("");

  useEffect(() => {
    if (updtElement) {
      console.log(updtElement);
      setData(updtElement);
    }
    if (type === "article" || type === "coment") {
      setTxtAreaName("content");
    } else if (type === "notable") setTxtAreaName("description");
  }, [updtElement, txtAreaName, type]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: e.target.type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form action="" onSubmit={handleSubmit} className={type}>
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

      {type === "article" || type === "coment" || type === "notable" ? (
        <textarea
          name={txtAreaName}
          value={formData[txtAreaName]}
          placeholder={
            type === "coment"
              ? "Escriba su comentario"
              : "Zona de texto para el contenido"
          }
          onChange={handleChange}
        ></textarea>
      ) : null}

      {type === "user" ? (
        <select
          name="role"
          onChange={handleChange}
          value={formData["role"] || ""}
        >
          {type === "user" ? <option value="">Selecciona un rol</option> : null}
          <option value="admin">Admin</option>
          <option value="user">Usuario comun</option>
        </select>
      ) : null}
      <Button
        type={"submit"}
        txt={
          type === "login"
            ? "Iniciar Sesión"
            : type === "register"
            ? "Registro"
            : "save"
        }
        disabled={onSubmit?.isLoading}
      />

      {!formsWihtoutCancel.includes(type) ? (
        <Button type={"cancel"} txt={"cancel"} fn={fn} />
      ) : null}
      {type === "login" || type === "register" ? (
        <Button
          type={"change"}
          txt={
            type === "login"
              ? "No tienes cuenta, Registrate"
              : "Vuelta al inicio de sesion"
          }
          fn={changeLogin}
        />
      ) : null}
    </form>
  );
};
export default Form;
