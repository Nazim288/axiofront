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

export interface Review {
  id: number;
  userId: number | null;
  userName: string | null;
  targetType: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface PersonCurrentResponse {
  id: number;
  firstName: string;
  lastName: string | null;
  middleName: string | null;
  age: number;
  gender: "MALE" | "FEMALE";
  location: string;
  email: string;
  login: string;
  phoneNumber: string | null;
  birthDate: string;
  status: "ACTIVE" | "INACTIVE";
  reviews: Review[];
  emailVerified: boolean;
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
  clearCurrentUserFromStorage();
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

export const getPersonCurrent = async (): Promise<PersonCurrentResponse> => {
  try {
    const response = await api.get(Urls.authUrls.getPersonCurrent);
    const userData = response.data;

    // Сохраняем данные пользователя в localStorage
    localStorage.setItem("currentUser", JSON.stringify(userData));

    return userData;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
};

// Функция для получения пользователя из localStorage
export const getCurrentUserFromStorage = (): PersonCurrentResponse | null => {
  try {
    const userData = localStorage.getItem("currentUser");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Ошибка при получении пользователя из localStorage:", error);
    return null;
  }
};

// Функция для очистки данных пользователя из localStorage
export const clearCurrentUserFromStorage = (): void => {
  localStorage.removeItem("currentUser");
};

interface EmailConfirmSendBody {
  email: string;
  code: string;
}

interface EmailConfirmBody {
  email: string;
  code: string;
}

export const emailConfirmSend = async (
  body: EmailConfirmSendBody
): Promise<string> => {
  try {
    const response = await api.post<string>(
      Urls.authUrls.emailConfirmSend,
      body
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке подтверждения email:", error);
    throw error;
  }
};

export const emailConfirm = async (body: EmailConfirmBody): Promise<string> => {
  try {
    const response = await api.post<string>(Urls.authUrls.emailConfirm, body);
    return response.data;
  } catch (error) {
    console.error("Ошибка при верификации email:", error);
    throw error;
  }
};

function convertYearRangeToDate(yearRange: string): string {
  const [startYear] = yearRange.split("-");
  return `${startYear}-01-01`;
}
