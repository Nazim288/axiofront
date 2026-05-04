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

// При протухшем/невалидном токене сервер отвечает 401 — чистим сессию и
// уведомляем UserContext (как при ручном logout), иначе UI остаётся «залогиненным» до F5.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      window.dispatchEvent(new Event("tokenChange"));
      window.dispatchEvent(new Event("userChange"));
    }
    return Promise.reject(error);
  }
);

export default api;
