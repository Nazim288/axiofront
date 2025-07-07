import axios from "axios";

const api = axios.create({
  baseURL: "/",
});

// Интерцептор для добавления токена во все запросы
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const tokenWithoutBearer = token?.replace(/^Bearer\s+/, "");
    if (tokenWithoutBearer) {
      config.headers.Authorization = `Bearer ${tokenWithoutBearer}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерцептор для обработки ответов и автоматической очистки токена при 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // Можно добавить редирект на страницу входа
      // window.location.href = '/signUp';
    }
    return Promise.reject(error);
  }
);

export default api;
