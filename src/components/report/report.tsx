"use client";

import {
  HeroRevealItem,
  HeroStagger,
} from "@/components/motion/scroll-reveal";

const Report = () => {
  return (
    <HeroStagger className="flex flex-col gap-4" stagger={0.1}>
      <HeroRevealItem variant="blur-up">
        <h1 className="text-2xl font-bold">Полный отчёт «Мои ценности»</h1>
      </HeroRevealItem>

      <HeroRevealItem variant="fade-up">
        <p>
          — это ваш индивидуальный путь к самопознанию. Вы сделали шаг к лучшему
          пониманию себя!
        </p>
      </HeroRevealItem>

      <HeroRevealItem variant="fade-right">
        <div>
          <p className="italic">Что Вы найдёте в отчёте:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              Перечень Ваших базовых ценностей, которые влияют на жизненные
              решения.
            </li>
            <li>
              Описание привычных стратегий поведения, которые преобладают у Вас
              в новых и непредсказанных ситуациях.
            </li>
            <li>
              Рекомендации по увеличению эффективности взаимодействия с
              окружающими людьми дома и на работе.
            </li>
          </ul>
        </div>
      </HeroRevealItem>

      <HeroRevealItem variant="fade-left">
        <div>
          <p>
            <strong>Краткая справка:</strong>
          </p>
          <p>
            Ценности — это устойчивые убеждения, появляющиеся под влиянием семьи,
            личных достижений или препятствий. Они формируются с детства и
            определяют ваши выборы и поведение в жизни.
          </p>
        </div>
      </HeroRevealItem>

      <HeroRevealItem variant="scale-up">
        <div>
          <p>
            <strong>Зачем анализировать свою систему ценностей:</strong>
          </p>
          <p>
            Чтобы лучше понимать себя и окружающих для лучшего прогнозирования
            поведения в разных ситуациях.
          </p>
          <p>Прогнозирование поведения основано на:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>
              понимании, что Вы замечаете и пропускаете при общении с другими;
            </li>
            <li>знании, какие Ваши ценности влияют на ежедневные решения;</li>
            <li>
              понимании, какие ценности запускаются в условиях неопределённости,
              когда нужно быстро принимать решения без информации.
            </li>
          </ul>
        </div>
      </HeroRevealItem>

      <HeroRevealItem variant="fade-up">
        <div>
          <p>
            <strong>
              В отчёте, представлены ранги ценностей по двум уровням:
            </strong>
          </p>
          <p>
            <strong>Уровень идеалов:</strong> «Я считаю, что в жизни важным должно
            быть ...» — ценности, как убеждения, которые важны Вам лично.
          </p>
          <p>
            <strong>Уровень поведения:</strong> «Я делаю так, чтобы оправдать
            ожидания окружающих о том, что должно быть важным» — ценности,
            которые не по Вашему мнению, соответствуют ожиданиям окружающих людей.
          </p>
        </div>
      </HeroRevealItem>

      <HeroRevealItem variant="blur-up">
        <p>
          <strong>Перейдем к вашим индивидуальным результатам.</strong>
        </p>
        <p>Ваш ранг ценностей по уровню идеалов:</p>
      </HeroRevealItem>
    </HeroStagger>
  );
};

export default Report;
