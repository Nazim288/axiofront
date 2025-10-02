"use client";

import { Button } from "@/components/ui/button";

const Survey = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-5xl font-bold">Тарифы</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
        {/* Колонка 1 - Пробный (бесплатно) */}
        <div className="flex flex-col gap-5 baseShadow rounded-3xl p-5 h-fit hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="flex justify-between h-[100px]">
            <h2 className="text-2xl font-semibold text-primary">
              Пробный (бесплатно)
            </h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Познакомьтесь с нашим сервисом — создайте личный кабинет, пройдите
            опросник и получите сокращённый отчет, где представлены 3 наиболее
            важные ценности именно для вас. Отличный старт для самопознания без
            затрат.
          </p>
          <Button className="rounded-[40px] mt-auto" variant="default" disabled>
            Уже у вас
          </Button>
        </div>

        {/* Колонка 2 - Расширенный отчет о ценностях */}
        <div className="flex flex-col gap-5 baseShadow rounded-3xl p-5 h-fit hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="flex justify-between h-[100px]">
            <h2 className="text-2xl font-semibold text-[#FFC727]">
              Расширенный отчет о ценностях
            </h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Получите подробный отчет с ранжированием ценностей по их значимости
            для Вас и рекомендации для гармоничного саморазвития и улучшения
            взаимодействия с другими людьми.
          </p>
          <Button className="rounded-[40px] mt-auto">900 ₽</Button>
        </div>

        {/* Колонка 3 - Совместимость ценностей */}
        <div className="flex flex-col gap-5 baseShadow rounded-3xl p-5 h-fit hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="flex justify-between h-[100px]">
            <h2 className="text-2xl font-semibold text-[#FF9800]">
              Совместимость ценностей
            </h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Сравните свои ценности с ценностями другого пользователя. Вы узнаете
            о сходствах и различиях, а также получите практические рекомендации
            для улучшения взаимодействия с партнёром в семейных и рабочих
            условиях.
          </p>
          <Button className="rounded-[40px] mt-auto">900 ₽</Button>
        </div>

        {/* Колонка 4 - Комбинированный пакет */}
        <div className="flex flex-col gap-5 baseShadow rounded-3xl p-5 h-fit hover:scale-105 transition-transform duration-300 ease-in-out border-2 border-[#FF6B35]">
          <div className="flex justify-between h-[100px]">
            <h2 className="text-2xl font-semibold text-[#FF6B35]">
              Расширенный отчет + Совместимость
            </h2>
          </div>
          <div className="text-gray-600 text-sm leading-relaxed">
            <p className="mb-3">
              <strong>1) Подробный отчет</strong> с ранжированием ценностей по
              их значимости для Вас и рекомендации для гармоничного саморазвития
              и улучшения взаимодействия с другими людьми.
            </p>
            <p>
              <strong>2) Сравнение Ваших ценностей</strong> с ценностями другого
              пользователя с выявлением сходств и различий. Практические советы
              для гармоничного взаимодействия с партнером как в семейной, так и
              в рабочей сфере.
            </p>
          </div>
          <Button className="rounded-[40px] mt-auto bg-[#FF6B35] hover:bg-[#E55A2B]">
            1500 ₽
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Survey;
