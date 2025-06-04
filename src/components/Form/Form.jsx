import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schemas from "./schemasValidations.js";

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

const Form = ({ children, type, fn, submit, updtElement, changeLogin }) => {
  const [txtAreaName] = useState(
    type === "article" || type === "coment"
      ? "content"
      : type === "notable"
      ? "description"
      : ""
  );
  const schema = schemas[type];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: schema ? yupResolver(schema) : undefined,
    defaultValues: updtElement || {},
  });

  const submitHandler = (data) => {
    submit(data);
  };

  return (
    <form action="" onSubmit={handleSubmit(submitHandler)} className={type}>
      {forms[type].map((fieldAttrs) => (
        <Field
          atrs={fieldAttrs}
          key={fieldAttrs.name}
          error={errors[fieldAttrs.name]?.message}
          register={register}
        >
          {children}
        </Field>
      ))}

      {(type === "article" || type === "coment" || type === "notable") &&
      txtAreaName ? (
        <>
          <textarea
            name={txtAreaName}
            placeholder={
              type === "coment"
                ? "Escriba su comentario"
                : "Zona de texto para el contenido"
            }
            {...register(txtAreaName)}
          ></textarea>
          {errors[txtAreaName] && <p>{errors[txtAreaName].message}</p>}
        </>
      ) : null}

      {type === "user" ? (
        <>
          <select name="role">
            {type === "user" ? (
              <option value="">Selecciona un rol</option>
            ) : null}
            <option value="admin">Admin</option>
            <option value="user">Usuario comun</option>
          </select>
          {errors.role && <p>{errors["role"].message}</p>}
        </>
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
        disabled={submit?.isLoading}
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
