import api from "./api";
import { Urls } from "./urls";

interface RegisterBody {
  email: string;
  login: string;
  password: string;
}

interface LoginBody {
  username: string;
  password: string;
}

export const loginUser = async (body: LoginBody) => {
  try {
    const response = await api.post(Urls.authUrls.login, body);
    return response.data;
  } catch (error) {
    console.error("Ошибка при авторизации:", error);
    throw error;
  }
};

export const registerUser = async (body: RegisterBody) => {
  try {
    const response = await api.post(Urls.authUrls.register, body);
    return response.data;
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    throw error;
  }
};
