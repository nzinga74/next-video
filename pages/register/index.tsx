import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import TextInput from "../../components/TextInput";
import { IFormData, schema } from "./types";
import api from "../../services/api";
import { REGISTER_PATH } from "../../utils/paths";
import Loading from "../../client/component/Loading";

const Login: NextPage = () => {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    const { email, password, username } = data;
    console.log(data);
    try {
      const response = await api.post(REGISTER_PATH, {
        email,
        password,
        username,
      });
      const { success } = response.data;

      if (success) {
        toast.success("Registro feito com sucesso");
        router.push("/login");
      }
    } catch (err) {
      const message = JSON.parse(err.request.response).message;
      toast.error(message);
    }
  };

  return (
    <>
      <div className="wrapper-login">
        <div className="form-side">
          <form onSubmit={handleSubmit(onSubmit)}>
            <img
              src="/assets/grpc.png"
              width={110}
              height={110}
              style={{ marginBottom: 20 }}
            />
            <TextInput
              control={control}
              name="username"
              className="input-type"
              type="text"
              placeholder="Nome"
            />
            <TextInput
              control={control}
              name="email"
              className="input-type"
              type="text"
              placeholder="Email"
            />
            <TextInput
              control={control}
              name="password"
              className="input-type"
              type="password"
              placeholder="Senha"
            />
            <input
              disabled={isSubmitting}
              className="login-button"
              type="submit"
              value="Registrar"
            />
          </form>
          {isSubmitting && (
            <div className="loading">
              <Loading />
            </div>
          )}
        </div>
        <div className="image-side"></div>
      </div>
    </>
  );
};

export default Login;
