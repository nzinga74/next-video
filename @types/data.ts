export interface IAuthProviderData {
  logged: boolean;
  login: ({ email, password }: ILoginRequest) => Promise<ILoginReturn>;
  userId: string;
  signInGoogle?: () => void;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginReturn {
  success: boolean;
  message?: string;
}
