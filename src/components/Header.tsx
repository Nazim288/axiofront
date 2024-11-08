"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInModal } from "./modals/signInModal";
const Header: React.FC = () => {
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
              <Button variant="link" className="text-black">
                Об опросе
              </Button>
            </li>
            <li>
              <Button variant="link" className="text-black">
                Часто задаваемые вопросы
              </Button>
            </li>
            <li>
              <Button variant="link" className="text-black">
                О компании
              </Button>
            </li>
            <li>
              <Button variant="link" className="text-black">
                Новости
              </Button>
            </li>
            <li>
              <Button variant="link" className="text-black">
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
