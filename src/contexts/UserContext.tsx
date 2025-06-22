"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface UserContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Проверяем токен при инициализации и при изменениях в localStorage
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    // Проверяем начальное состояние
    checkAuth();

    // Слушаем изменения в localStorage
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "token") {
        checkAuth();
      }
    };

    // Добавляем слушатель для window storage event
    window.addEventListener("storage", handleStorageChange);

    // Создаем кастомное событие для отслеживания изменений в том же окне
    const handleCustomStorageChange = () => checkAuth();
    window.addEventListener("tokenChange", handleCustomStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("tokenChange", handleCustomStorageChange);
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
    setIsAuthenticated(false);
    // Вызываем кастомное событие для уведомления об изменении
    window.dispatchEvent(new Event("tokenChange"));
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, login, logout }}>
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
