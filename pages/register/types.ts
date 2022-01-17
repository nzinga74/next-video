import * as yup from "yup";

export interface IFormData {
  email: string;
  password: string;
  username: string;
}

export const schema = yup.object().shape({
  email: yup
    .string()
    .email("Endereço de e-mail com formato incorrecto")
    .required("Informe o seu email"),
  password: yup.string().required("Informe a sua senha"),
  username: yup.string().required("Informe o nome "),
});
