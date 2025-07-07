"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

const Footer: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const footerLinks = [
    { id: "rules", text: "Правила пользования сайтом" },
    { id: "offer", text: "Договор оферты" },
    { id: "privacy", text: "Политика конфиденциальности" },
  ];

  return (
    <footer className="text-black p-4 shadow-[10px_10px_10px_10px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src={"/icons/logo.svg"} alt="Logo" width={43} height={43} />
          </Link>
          <p>Open-me</p>
        </div>

        {/* Десктопная навигация */}
        <nav className="hidden lg:block">
          <ul className="flex justify-between gap-4">
            {footerLinks.map((link) => (
              <li key={link.id}>
                <Button variant="link" className="text-black">
                  {link.text}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Мобильная навигация */}
        <div className="lg:hidden">
          <button
            className="w-full flex items-center justify-between p-2 border rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span>Информация</span>
            {isMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {isMenuOpen && (
            <nav className="mt-2">
              <ul className="flex flex-col gap-2 border rounded-md p-2">
                {footerLinks.map((link) => (
                  <li key={link.id}>
                    <Button
                      variant="link"
                      className="text-black w-full text-left"
                    >
                      {link.text}
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
