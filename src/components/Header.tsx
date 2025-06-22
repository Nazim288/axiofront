"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInModal } from "./modals/signInModal";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { logoutUser } from "@/api/auth";

const Header: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useUser();

  const handleNavigation = (
    event: React.MouseEvent<HTMLButtonElement>,
    anchorId: string
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

  const AuthButtons = () => {
    if (isAuthenticated) {
      return (
        <>
          <Link href="/survey">
            <Button variant="default" className="rounded-[40px]">
              Пройти опрос
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="outline" className="rounded-[40px]">
              Профиль
            </Button>
          </Link>
          <Button
            variant="outline"
            className="rounded-[40px]"
            onClick={handleLogout}
          >
            Выйти
          </Button>
        </>
      );
    }

    return (
      <>
        <SignInModal />
        <Link href="/signUp">
          <Button variant="outline" className="rounded-[40px]">
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
  ];

  return (
    <header className="text-black p-4 shadow-lg relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src={"/icons/logo.svg"} alt="Logo" width={43} height={43} />
          </Link>
          <p>Open-me</p>
        </div>

        <nav className="hidden lg:block">
          <ul className="flex justify-between gap-4">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <Button
                  variant="link"
                  className="text-black"
                  onClick={(e) => handleNavigation(e, item.id)}
                >
                  {item.text}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:flex justify-between gap-4">
          <AuthButtons />
        </div>

        <button
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-30">
          <nav className="p-4">
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
              <li className="pt-4 flex flex-col gap-4">
                <AuthButtons />
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
