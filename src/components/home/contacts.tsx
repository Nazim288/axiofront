"use client";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import Image from "next/image";
import Link from "next/link";

const Contacts = ({ id }: { id: string }) => {
  return (
    <div
      id={id}
      className="mb-12 mt-16 flex flex-col justify-start gap-10 lg:mb-20 lg:mt-24 lg:flex-row lg:gap-24"
    >
      <ScrollReveal variant="fade-right" className="flex-1">
        <div>
          <h1 className="mb-4 text-3xl font-semibold lg:text-4xl">
            Обратная связь
          </h1>
          <p className="font-semibold">
            По вашим предложениям, вопросам и комментариям пишите нам на email:{" "}
            <Link
              href="mailto:AG@Tarbastaev.ru"
              className="text-primary underline"
            >
              AG@Tarbastaev.ru
            </Link>
          </p>
        </div>
      </ScrollReveal>
      <ScrollReveal variant="fade-left" className="flex-1">
        <div className="flex flex-col gap-2">
          <h1 className="mb-2 text-3xl font-semibold lg:text-4xl">Контакты</h1>
          <p>
            <Link
              href="https://vk.com/axiogram"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary underline"
            >
              <Image
                src="/icons/vk.svg"
                alt="ВКонтакте"
                width={22}
                height={22}
                className="shrink-0"
              />
              Официальное сообщество в ВКонтакте
            </Link>
          </p>
          <p>
            <Link href="tel:+79152935237" className="text-primary underline">
              +7 (915) 293 52 37
            </Link>
          </p>
          <p>
            <Link
              href="https://tarbastaev.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              https://tarbastaev.ru
            </Link>
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default Contacts;
