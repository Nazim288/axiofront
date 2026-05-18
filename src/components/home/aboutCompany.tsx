"use client";

import {
  ScrollReveal,
  ScrollRevealItem,
  ScrollRevealStagger,
} from "@/components/motion/scroll-reveal";

const columns = [
  {
    title: "Миссия",
    text: "Мы помогаем пользователям сервиса Axiogram строить гармоничные взаимоотношения с людьми и увеличивать продуктивность совместных дел",
  },
  {
    title: "Как мы это делаем",
    text: "Мы точно и быстро рассчитываем результаты, бережно храним данные, популяризируем науку",
  },
  {
    title: "Зачем мы это делаем",
    text: "Мы зарабатываем для того, чтобы инвестировать в научные проекты, направленные на укрепление семейных и производственных отношений между людьми",
  },
];

const columnVariants = ["fade-up", "fade-left", "fade-right"] as const;

const AboutCompany = ({ id }: { id: string }) => {
  return (
    <div id={id} className="flex flex-col gap-5 mt-16 lg:mt-24">
      <ScrollReveal variant="blur-up">
        <h1 className="text-3xl lg:text-4xl font-semibold">О компании</h1>
      </ScrollReveal>
      <ScrollRevealStagger className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-4">
        {columns.map((column, index) => (
          <ScrollRevealItem
            key={column.title}
            variant={columnVariants[index] ?? "fade-up"}
            className="flex flex-col gap-2"
          >
            <p className="text-primary font-semibold">{column.title}</p>
            <p className="font-normal">{column.text}</p>
          </ScrollRevealItem>
        ))}
      </ScrollRevealStagger>
    </div>
  );
};

export default AboutCompany;
