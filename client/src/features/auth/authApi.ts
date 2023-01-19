import axios from "axios";
import { GenericResponse } from "../../types/type";
import { LoginResponse, UserType } from "./authTypes";
import { LoginInput } from "./schemas/loginSchema";
import { RegisterInputWithoutPassConf } from "./schemas/registerSchema";

const BASE_URL = "https://rmitiio-api.ramaakbar.xyz/api/auth";

const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

export const refreshAccessTknFn = async () => {
  const res = await authApi.get<LoginResponse>("refresh");
  return res.data;
};

export const loginUserFn = async (user: LoginInput) => {
  const res = await authApi.post<LoginResponse>("", user);
  return res.data;
};

export const registerUserFn = async (user: RegisterInputWithoutPassConf) => {
  const res = await authApi.post<UserType>("register", user);
  return res.data;
};

export const logoutUserFn = async () => {
  const res = await authApi.post<GenericResponse>("logout");
  return res.data;
};
