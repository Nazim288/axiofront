"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";

export const UserDataLoader = () => {
  // Этот компонент автоматически загружает данные пользователя при авторизации
  useCurrentUser();

  // Компонент не рендерит ничего видимого
  return null;
};
