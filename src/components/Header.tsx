"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInModal } from "./modals/signInModal";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const Header: React.FC = () => {
  const router = useRouter();
  const params = useParams();

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

  return (
    <header className="text-black p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src={"/icons/logo.svg"} alt="Logo" width={43} height={43} />
          </Link>
          <p>
            Совместимость <br />
            Ценностей
          </p>
        </div>
        <nav>
          <ul className="flex justify-between gap-4 ">
            <li>
              <Button
                variant="link"
                className="text-black"
                onClick={(e) => handleNavigation(e, "about")}
              >
                Об опросе
              </Button>
            </li>
            <li>
              <Button
                variant="link"
                className="text-black"
                onClick={(e) => handleNavigation(e, "faq")}
              >
                Часто задаваемые вопросы
              </Button>
            </li>
            <li>
              <Button
                variant="link"
                className="text-black"
                onClick={(e) => handleNavigation(e, "company")}
              >
                О компании
              </Button>
            </li>
            <li>
              <Button
                variant="link"
                className="text-black"
                onClick={(e) => handleNavigation(e, "news")}
              >
                Новости
              </Button>
            </li>
            <li>
              <Button
                variant="link"
                className="text-black"
                onClick={(e) => handleNavigation(e, "contacts")}
              >
                Контакты
              </Button>
            </li>
          </ul>
        </nav>
        <div className="flex justify-between gap-4">
          <Link href="/survey">
            <Button variant="default" className="rounded-[40px]">
              Пройти опрос
            </Button>
          </Link>
          <SignInModal />
          <Link href="/profile">
            <Button variant="outline" className="rounded-[40px]">
              Профиль
            </Button>
          </Link>
          <Link href="/signUp">
            <Button variant="outline" className="rounded-[40px]">
              Регистрация
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
