"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  PersonCurrentResponse,
  getCurrentUserFromStorage,
  clearCurrentUserFromStorage,
} from "@/api/auth";

interface UserContextType {
  isAuthenticated: boolean;
  currentUser: PersonCurrentResponse | null;
  login: (token: string) => void;
  logout: () => void;
  setCurrentUser: (user: PersonCurrentResponse | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<PersonCurrentResponse | null>(
    null
  );

  // Проверяем токен и данные пользователя при инициализации и при изменениях в localStorage
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const isAuth = !!token;
      setIsAuthenticated(isAuth);

      // Если пользователь авторизован, загружаем его данные из localStorage
      if (isAuth) {
        const userData = getCurrentUserFromStorage();
        setCurrentUser(userData);
      } else {
        setCurrentUser(null);
      }
    };

    // Проверяем начальное состояние
    checkAuth();

    // Слушаем изменения в localStorage
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "token" || event.key === "currentUser") {
        checkAuth();
      }
    };

    // Добавляем слушатель для window storage event
    window.addEventListener("storage", handleStorageChange);

    // Создаем кастомное событие для отслеживания изменений в том же окне
    const handleCustomStorageChange = () => checkAuth();
    window.addEventListener("tokenChange", handleCustomStorageChange);
    window.addEventListener("userChange", handleCustomStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("tokenChange", handleCustomStorageChange);
      window.removeEventListener("userChange", handleCustomStorageChange);
    };
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    // Вызываем кастомное событие для уведомления об изменении
    window.dispatchEvent(new Event("tokenChange"));
  };

  const logout = () => {
    localStorage.removeItem("token");
    clearCurrentUserFromStorage();
    setIsAuthenticated(false);
    setCurrentUser(null);
    // Вызываем кастомное событие для уведомления об изменении
    window.dispatchEvent(new Event("tokenChange"));
    window.dispatchEvent(new Event("userChange"));
  };

  const handleSetCurrentUser = (user: PersonCurrentResponse | null) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      clearCurrentUserFromStorage();
    }
    window.dispatchEvent(new Event("userChange"));
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        logout,
        setCurrentUser: handleSetCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
