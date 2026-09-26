"use client";

import {
  ScrollReveal,
  ScrollRevealItem,
  ScrollRevealStagger,
} from "@/components/motion/scroll-reveal";

const columns = [
  {
    title: "Миссия",
    text: "Мы помогаем людям лучше понимать свои ценности и видеть, насколько они совпадают с привычным поведением. Это знание помогает принимать более осознанные решения и лучше понимать окружающих.",
  },
  {
    title: "Как мы это делаем",
    text: "Мы создаём понятные опросники и персональные отчёты, рассчитываем результаты и объясняем их простым языком. Пользователь получает практические рекомендации и самостоятельно решает, с кем делиться своим результатом.",
  },
  {
    title: "Зачем мы это делаем",
    text: "Мы хотим сделать самопознание через ценности понятным, доступным и применимым в повседневной жизни. Доход от сервиса мы направляем на развитие Axiogram: постоянное улучшение качества методики и создание новых инструментов индивидуального и совместного анализа.",
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
