import * as yup from "yup";

const FILE_FORMATS = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
const schemas = {
  user: yup.object().shape({
    name: yup.string().required("El nombre es obligatorio"),
    lastName: yup.string().required("El apellido es obligatorio"),
    email: yup
      .string()
      .email("El email no es válido")
      .required("El email es requerido"),
    passwor: yup
      .string()
      .min(8, "La contraseña ha de tener nínimo 8 caracteres"),
    role: yup.string().required("seleccione un rol valido"),
  }),
  article: yup.object().shape({
    title: yup
      .string()
      .max(50, "El título no puede tener más de 50 caracteres")
      .required("El titulo es requerido"),
    subTitle: yup
      .string()
      .max(124, "El subtítulo no puede tener más de 50 caracteres")
      .required("El subtitulo es requerido"),
    file: yup
      .mixed()
      .test(
        "fileType",
        "La imagen ha de ser en uno de los formatos: png, jpg, jpeg, webp",
        (value) => {
          if (!value) return true;
          return FILE_FORMATS.includes(value.type);
        }
      ),
    content: yup.string().required("El articulo ha de tener contenido"),
  }),
  notable: yup.object().shape({
    name: yup.string().required("El nombre es obligatorio"),
    content: yup.string().required("El articulo ha de tener contenido"),
    file: yup
      .mixed()
      .test(
        "fileType",
        "La imagen ha de ser en uno de los formatos: png, jpg, jpeg, webp",
        (value) => {
          if (!value) return true;
          return FILE_FORMATS.includes(value.type);
        }
      ),
    login: yup.object().shape({
      email: yup
        .string()
        .email("El email no es válido")
        .required("El email es requerido"),
      passwor: yup
        .string()
        .min(8, "La contraseña ha de tener nínimo 8 caracteres"),
    }),
  }),
  register: yup.object().shape({
    email: yup
      .string()
      .email("El email no es válido")
      .required("El email es requerido"),
    password: yup
      .string()
      .min(8, "La contraseña ha de tener nínimo 8 caracteres"),
    password2:yup.string().oneOf([yup.ref('password')],'Las contraseñas deben coincidir')
  }),
};

export default schemas;
