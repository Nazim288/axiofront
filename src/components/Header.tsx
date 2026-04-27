"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInModal } from "./modals/signInModal";
import { usePathname, useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useGender } from "@/contexts/GenderContext";
import { logoutUser } from "@/api/auth";
import { Gender } from "@/lib/imageUtils";

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const { isAuthenticated, logout } = useUser();
  const { selectedGender, setSelectedGender } = useGender();

  const handleNavigation = (
    event: React.MouseEvent<HTMLButtonElement>,
    anchorId: string,
  ) => {
    event.preventDefault();
    if (params.pathname === "/") {
      const element = document.getElementById(anchorId);
      if (element) {
        window.scrollTo({ top: element.offsetTop, behavior: "smooth" });
      }
    } else {
      router.push("/#" + anchorId);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  const AuthButtons = ({
    onAction,
    isMobile = false,
  }: {
    onAction?: () => void;
    isMobile?: boolean;
  }) => {
    const buttonClassName = isMobile
      ? "w-full"
      : "h-9 px-3 text-sm whitespace-nowrap";
    const linkClassName = isMobile ? "w-full" : "";

    if (isAuthenticated) {
      return (
        <>
          <Link href="/survey" onClick={onAction} className={linkClassName}>
            <Button variant="default" className={buttonClassName}>
              Пройти опрос
            </Button>
          </Link>
          <Link href="/profile" onClick={onAction} className={linkClassName}>
            <Button variant="outline" className={buttonClassName}>
              Профиль
            </Button>
          </Link>
          <Button
            variant="outline"
            className={buttonClassName}
            onClick={handleLogout}
          >
            Выйти
          </Button>
        </>
      );
    }

    return (
      <>
        <SignInModal
          triggerClassName={buttonClassName}
        />
        <Link href="/signUp" onClick={onAction} className={linkClassName}>
          <Button variant="outline" className={buttonClassName}>
            Регистрация
          </Button>
        </Link>
      </>
    );
  };

  const navigationItems = [
    { id: "about", text: "Об опросе" },
    { id: "faq", text: "Часто задаваемые вопросы" },
    { id: "company", text: "О компании" },
    { id: "news", text: "Новости" },
    { id: "contacts", text: "Контакты" },
    { id: "tariffs", text: "Тарифы" },
    { id: "reviews", text: "Отзывы" },
  ];

  const GenderSwitcher = () => {
    const handleGenderChange = (gender: Gender) => {
      setSelectedGender(gender);
    };

    return (
      <div className="inline-flex items-center gap-2 border rounded-full p-1 bg-gray-100 mx-auto">
        <Button
          variant={selectedGender === "FEMALE" ? "default" : "ghost"}
          size="sm"
          className={`rounded-full ${
            selectedGender === "FEMALE"
              ? "bg-primary text-primary-foreground"
              : "text-gray-600"
          }`}
          onClick={() => handleGenderChange("FEMALE")}
        >
          Ж
        </Button>
        <Button
          variant={selectedGender === "MALE" ? "default" : "ghost"}
          size="sm"
          className={`rounded-full ${
            selectedGender === "MALE"
              ? "bg-primary text-primary-foreground"
              : "text-gray-600"
          }`}
          onClick={() => handleGenderChange("MALE")}
        >
          М
        </Button>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex w-full max-w-none items-center justify-between gap-4 xl:gap-8 px-1 py-3 sm:px-2 lg:px-4">
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            <div className="flex gap-3 sm:gap-4 justify-center items-center shrink-0">
              <Image
                src={"/icons/header.png"}
                alt="Logo"
                width={44}
                height={44}
                className="w-8 h-8 sm:w-9 sm:h-9 xl:w-10 xl:h-10"
              />
              <Image
                src={"/icons/axio.png"}
                alt="Logo"
                width={170}
                height={40}
                className="w-[105px] sm:w-[120px] xl:w-[140px] h-auto"
              />
            </div>
          </Link>
        </div>

        <nav className="hidden xl:block flex-1">
          <ul className="flex justify-center gap-1">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <Button
                  variant="link"
                  className="text-black px-2 text-sm"
                  onClick={(e) => handleNavigation(e, item.id)}
                >
                  {item.text}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden xl:flex shrink-0 justify-between items-center gap-2">
          {!isAuthenticated && <GenderSwitcher />}
          <AuthButtons />
        </div>

        <button
          className="xl:hidden rounded-xl border border-border p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-md z-30">
          <nav className="p-4 sm:px-6">
            <ul className="flex flex-col gap-4">
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <Button
                    variant="link"
                    className="text-black w-full text-left"
                    onClick={(e) => {
                      handleNavigation(e, item.id);
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.text}
                  </Button>
                </li>
              ))}
              {!isAuthenticated && (
                <li className="pt-4 flex justify-center">
                  <GenderSwitcher />
                </li>
              )}
              <li className="pt-4 flex flex-col gap-3 items-stretch">
                <AuthButtons
                  onAction={() => setIsMenuOpen(false)}
                  isMobile={true}
                />
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
