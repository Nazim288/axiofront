"use client";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import Link from "next/link";

const Contacts = ({ id }: { id: string }) => {
  return (
    <div
      id={id}
      className="flex flex-col lg:flex-row justify-start gap-10 lg:gap-24 mt-16 lg:mt-24 mb-12 lg:mb-20"
    >
      <ScrollReveal variant="fade-right" className="flex-1">
        <div>
          <h1 className="text-3xl lg:text-4xl font-semibold mb-4">
            Обратная связь
          </h1>
          <p className="font-semibold">
            Для записи на вебинар и иным предложениям или комментариям пишите
            нам на email: AG@Tarbastaev.ru
          </p>
        </div>
      </ScrollReveal>
      <ScrollReveal variant="fade-left" className="flex-1">
        <div>
          <h1 className="text-3xl lg:text-4xl font-semibold mb-4">Контакты</h1>
          <p>
            <Link
              href="https://vk.com/axiogram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Официальное сообщество в ВКонтакте
            </Link>
          </p>
          <p>
            <Link
              href="tel:+79152935237"
              className="text-primary underline"
            >
              +7 (915) 293 52 37
            </Link>
          </p>
          <p>
            <Link
              href="mailto:AG@Tarbastaev.ru"
              className="text-primary underline"
            >
              AG@Tarbastaev.ru
            </Link>
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default Contacts;
