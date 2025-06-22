import api from "./api";
import { Urls } from "./urls";

interface RegisterBody {
  gender: "male" | "female";
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

export const logoutUser = async () => {
  // try {
  //   const response = await api.get(Urls.authUrls.logout);
  //   if (response.status === 200) {
  //     localStorage.removeItem("token");
  //     return true;
  //   }
  //   return false;
  // } catch (error) {
  //   console.error("Ошибка при выходе:", error);
  //   throw error;
  // }
  localStorage.removeItem("token");
};

export const loginUser = async (body: LoginBody) => {
  try {
    const response = await api.post(Urls.authUrls.login, body);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error("Ошибка при авторизации:", error);
    throw error;
  }
};

export const registerUser = async (body: RegisterBody) => {
  const formattedBody = {
    ...body,
    gender: body.gender.toUpperCase(),
    yearOfBirth: convertYearRangeToDate(body.yearOfBirth),
  };

  try {
    const response = await api.post(Urls.authUrls.register, formattedBody);
    return response.data;
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    throw error;
  }
};

function convertYearRangeToDate(yearRange: string): string {
  const [startYear] = yearRange.split("-");
  return `${startYear}-01-01`;
}
