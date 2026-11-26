import type { LoginProps, RegisterProps } from "../types/index";
import api from "./client";

const login = async ({ login, password }: LoginProps) => {
  const response = await api.post("/auth/login", { login, password });
  localStorage.setItem('token', response.data.data.access_token);
  return response;
};

const register = async ({ email, login, password }: RegisterProps) => {
  const response = await api.post("/auth/register", { email, login, password });
  return response;
};

const getMe = async () => {
  const response = await api.get("/auth/me");
  return response;
};

export default {login,register,getMe};
