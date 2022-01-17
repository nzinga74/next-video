import React, { createContext, useState, useEffect } from "react";

import { IAuthProviderData, ILoginRequest, ILoginReturn } from "../@types/data";
import { provider } from "../firebase";
import { signInWithPopup, getAuth, GoogleAuthProvider } from "firebase/auth";
import api from "../services/api";
import { Constants } from "../utils/Constants";
import { AUTH_LOGIN, REGISTER_PATH } from "../utils/paths";
import Router from "next/router";
export const AuthContext = createContext<IAuthProviderData>(
  {} as IAuthProviderData
);

const AuthProvider: React.FC = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const auth = getAuth();

  const keepSigned = () => {
    const token = localStorage.getItem(Constants.TOKEN);
    const user = localStorage.getItem(Constants.USERID);
    if (token) {
      api.defaults.headers.common.Authorization = "Bearer " + token;
      setUserId(user);
    }
  };

  const login = async ({
    email,
    password,
  }: ILoginRequest): Promise<ILoginReturn> => {
    try {
      const response = await api.post(AUTH_LOGIN, {
        email,
        password,
      });

      const { success, data, message } = response.data;

      if (success) {
        localStorage.setItem(Constants.TOKEN, data.token);
        localStorage.setItem(Constants.USERID, data.userId);
        setUserId(data.userId);
        Router.push("/");
        return {
          success: true,
        };
      }

      return {
        success: false,
        message,
      };
    } catch (err) {
      return {
        success: false,
        message: "Erro ao iniciar sessão",
      };
    }
  };
  const registerGoogleUser = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      password = password.substring(0, 8);
      const response = await api.post(REGISTER_PATH, {
        email,
        password,
        username,
      });
    } catch (err) {
      console.log(JSON.parse(err.request.response).message);
    }
    login({ email, password });
  };

  const signInGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const { uid, email, displayName } = result.user;
        registerGoogleUser(email, uid, displayName);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const value = {
    logged: !!userId,
    login,
    userId,
    signInGoogle,
  };

  useEffect(() => {
    keepSigned();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
