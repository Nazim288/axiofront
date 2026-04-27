"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

const Footer: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const footerLinks = [
    { id: "rules", text: "Правила пользования сайтом", href: "/terms-of-use" },
    {
      id: "privacy",
      text: "Политика конфиденциальности",
      href: "/privacy-policy",
    },
    {
      id: "personal-data-consent",
      text: "Согласие на обработку персональных данных",
      href: "/consent-personal-data",
    },
    {
      id: "newsletter-consent",
      text: "Согласие на получение рассылок, информационных и рекламных материалов",
      href: "/consent-newsletter",
    },
  ];

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex w-full max-w-none flex-col gap-4 px-1 py-6 sm:px-2 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-4">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="flex gap-4 justify-center items-center">
              <Image
                src={"/icons/header.png"}
                alt="Logo"
                width={40}
                height={40}
              />
              <Image
                src={"/icons/axio.png"}
                alt="Logo"
                width={130}
                height={40}
                style={{ height: 30 }}
              />
            </div>
          </Link>
        </div>

        {/* Десктопная навигация */}
        <nav className="hidden lg:block">
          <ul className="flex flex-col items-end gap-1">
            {footerLinks.map((link) => (
              <li key={link.id}>
                <Button variant="link" className="text-black h-auto p-0" asChild>
                  <Link href={link.href}>{link.text}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Мобильная навигация */}
        <div className="lg:hidden">
          <button
            className="w-full flex items-center justify-between p-3 border border-border rounded-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span>Информация</span>
            {isMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {isMenuOpen && (
            <nav className="mt-2">
              <ul className="flex flex-col gap-2 border border-border rounded-2xl p-3">
                {footerLinks.map((link) => (
                  <li key={link.id}>
                    <Button
                      variant="link"
                      className="text-black w-full text-left h-auto justify-start px-0 py-1 whitespace-normal break-words text-sm leading-5"
                      asChild
                    >
                      <Link href={link.href} className="w-full">
                        {link.text}
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
