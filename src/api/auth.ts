import api from "./api";
import { Urls } from "./urls";

interface RegisterBody {
  gender: string;
  yearOfBirth: string;
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
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
    console.log(response.data);
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    throw error;
  }
};
