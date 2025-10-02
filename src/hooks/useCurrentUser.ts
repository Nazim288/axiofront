"use client";

import { useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { getPersonCurrent } from "@/api/auth";

export const useCurrentUser = () => {
  const { isAuthenticated, currentUser, setCurrentUser } = useUser();

  // Загружаем данные пользователя при авторизации
  useEffect(() => {
    const loadCurrentUser = async () => {
      if (isAuthenticated && !currentUser) {
        try {
          const userData = await getPersonCurrent();
          setCurrentUser(userData);
        } catch (error) {
          console.error("Ошибка при загрузке данных пользователя:", error);
        }
      }
    };

    loadCurrentUser();
  }, [isAuthenticated, currentUser, setCurrentUser]);

  return {
    currentUser,
    isAuthenticated,
    isLoading: isAuthenticated && !currentUser,
  };
};
