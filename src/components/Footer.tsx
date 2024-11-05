import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="text-black p-4 shadow-[10px_10px_10px_10px_rgba(0,0,0,0.5)]">
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
                Правила пользования сайтом
              </Button>
            </li>
            <li>
              <Button variant="link" className="text-black">
                Договор оферты
              </Button>
            </li>
            <li>
              <Button variant="link" className="text-black">
                Политика конфиденциальности
              </Button>
            </li>
            <li>
              <Button variant="link" className="text-black">
                Изображения взяты с Freepik.com
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
