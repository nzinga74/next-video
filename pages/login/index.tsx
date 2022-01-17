import type { NextPage } from "next";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Loading from "../../client/component/Loading";

import TextInput from "../../components/TextInput";

import { IFormData, schema } from "./types";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";
const Login: NextPage = () => {
  const { login, signInGoogle } = useAuth();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    const { email, password } = data;

    const status = await login({ email, password });

    if (status.success) {
      console.log("Login efectuado com sucesso");
    } else {
      console.log(status.message);
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
              value="Entrar"
            />
            <input
              className="login-button facebook-button"
              type="button"
              value="Google"
              onClick={() => signInGoogle()}
            />
          </form>

          <p
            className="acccount-create"
            onClick={() => router.push("/register")}
          >
            Criar Conta
          </p>
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
