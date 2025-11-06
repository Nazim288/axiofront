"use client";

import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useUser();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Проверяем токен в localStorage при монтировании компонента
    const token = localStorage.getItem("token");

    if (token) {
      // Если токен есть, но isAuthenticated еще false (гидратация)
      // ждем пока UserContext обновит состояние
      const checkAuthInterval = setInterval(() => {
        if (isAuthenticated) {
          setIsCheckingAuth(false);
          clearInterval(checkAuthInterval);
        }
      }, 50);

      // Таймаут на случай, если что-то пошло не так
      setTimeout(() => {
        clearInterval(checkAuthInterval);
        setIsCheckingAuth(false);
      }, 1000);

      return () => clearInterval(checkAuthInterval);
    } else {
      // Если токена нет, сразу редиректим
      setIsCheckingAuth(false);
      router.push("/?auth=signin");
    }
  }, [router]);

  useEffect(() => {
    // Если после проверки токена isAuthenticated стал false, редиректим
    if (!isCheckingAuth && !isAuthenticated) {
      router.push("/?auth=signin");
    }
  }, [isAuthenticated, isCheckingAuth, router]);

  // Показываем загрузку во время проверки аутентификации
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Если не авторизован, не показываем ничего (редирект уже произошел)
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
