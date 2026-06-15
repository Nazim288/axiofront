"use client";

import { Button } from "@/components/ui/button";
import {
  HeroReveal,
  ScrollRevealItem,
  ScrollRevealStagger,
} from "@/components/motion/scroll-reveal";
import { getScrollVariant } from "@/lib/motion";

const TARIFFS = [
  {
    title: "Краткий отчет о ценностях (бесплатно)",
    titleClass: "text-primary",
    description:
      "Познакомьтесь с нашим сервисом — создайте личный кабинет, пройдите опросник и получите сокращённый отчет, где представлены 3 наиболее важные ценности именно для вас. Отличный старт для самопознания без затрат.",
    action: (
      <Button className="mt-auto" variant="default" disabled>
        Уже у вас
      </Button>
    ),
  },
  {
    title: "Полный отчет о ценностях",
    titleClass: "text-amber-400",
    description:
      "Получите подробный полный отчет с ранжированием ценностей по их значимости для Вас и рекомендации для гармоничного саморазвития и улучшения взаимодействия с другими людьми.",
    action: (
      <Button
        className="mt-auto"
        onClick={() =>
          window.open(
            "https://tarbastaev.ru/Контакты/",
            "_blank",
            "noopener,noreferrer",
          )
        }
      >
        2900 ₽
      </Button>
    ),
  },
  {
    title: "Совместимость по ценностям",
    titleClass: "text-orange-500",
    description:
      "Сравните свои ценности с ценностями другого пользователя. Вы узнаете о сходствах и различиях, а также получите практические рекомендации для улучшения взаимодействия с партнёром в семейных и рабочих условиях.",
    action: (
      <Button className="mt-auto" disabled>
        В разработке
      </Button>
    ),
  },
] as const;

const TariffsPage = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <HeroReveal variant="blur-up" className="w-full text-center">
        <h1 className="text-4xl sm:text-5xl font-bold">Тарифы</h1>
      </HeroReveal>
      <ScrollRevealStagger
        className="flex flex-wrap justify-center gap-6 mt-10 lg:mt-14 w-full max-w-6xl mx-auto"
        stagger={0.1}
      >
        {TARIFFS.map((tariff, index) => (
          <ScrollRevealItem
            key={tariff.title}
            variant={getScrollVariant(index)}
            className="flex flex-col gap-5 baseShadow rounded-3xl p-5 h-fit w-full max-w-[360px] sm:max-w-[calc(50%-12px)] lg:w-[320px] lg:max-w-[360px] hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <div className="flex justify-between h-[100px]">
              <h2 className={`text-2xl font-semibold ${tariff.titleClass}`}>
                {tariff.title}
              </h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {tariff.description}
            </p>
            {tariff.action}
          </ScrollRevealItem>
        ))}
      </ScrollRevealStagger>
    </div>
  );
};

export default TariffsPage;
