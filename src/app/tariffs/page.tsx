"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

const Survey = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-5xl font-bold">Тарифы</h1>
      <div className="flex gap-10 mt-20">
        <div className="flex flex-col gap-5 baseShadow rounded-3xl p-5 w-full h-fit hover:scale-105 transition-transform duration-300 ease-in-out">
          <h2 className="text-3xl font-semibold text-primary">Бесплатно</h2>
          <ul>
            <li className="pb-4">
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 ease-in-out">
                <Image
                  src={"/icons/checkmark.svg"}
                  alt="checkmark"
                  width={40}
                  height={40}
                />
                расчёт ТОР-3 наиболее важных ценностей
              </div>
            </li>
            <li className="pb-4">
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 ease-in-out">
                <Image
                  src={"/icons/checkmark.svg"}
                  alt="checkmark"
                  width={40}
                  height={40}
                />
                доступ на вебинары
              </div>
            </li>
          </ul>
          <Button className="rounded-[40px]" variant="default" disabled>
            Уже у вас
          </Button>
        </div>

        <div className="flex flex-col gap-5 baseShadow rounded-3xl p-5 w-full h-fi hover:scale-105 transition-transform duration-300 ease-in-out">
          <h2 className="text-3xl font-semibold text-[#FFC727]">Стандарт</h2>
          <ul>
            <li className="pb-4">
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 ease-in-out">
                <Image
                  src={"/icons/checkmark.svg"}
                  alt="checkmark"
                  width={40}
                  height={40}
                />
                расчёт полного ранга всех 10 ценностей от наиболее важных
                ценностей к наименее важным, по двум уровням
              </div>
            </li>
            <li className="pb-4">
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 ease-in-out">
                <Image
                  src={"/icons/checkmark.svg"}
                  alt="checkmark"
                  width={40}
                  height={40}
                />
                расчёт внутриличностной согласованности ценностей
              </div>
            </li>
            <li className="pb-4">
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 ease-in-out">
                <Image
                  src={"/icons/checkmark.svg"}
                  alt="checkmark"
                  width={40}
                  height={40}
                />
                расчёт совместимости ценностей с партнёрами (100 человек/год)
              </div>
            </li>
            <li className="pb-4">
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 ease-in-out">
                <Image
                  src={"/icons/checkmark.svg"}
                  alt="checkmark"
                  width={40}
                  height={40}
                />
                доступ на вебинары
              </div>
            </li>
          </ul>
          <Button className="rounded-[40px]">1 900 ₽/ год</Button>
        </div>

        <div className="flex flex-col gap-5 baseShadow rounded-3xl p-5 w-full h-fi hover:scale-105 transition-transform duration-300 ease-in-out">
          <h2 className="text-3xl font-semibold text-[#FF9800]">Расширенный</h2>
          <ul>
            <li className="pb-4">
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 ease-in-out">
                <Image
                  src={"/icons/checkmark.svg"}
                  alt="checkmark"
                  width={40}
                  height={40}
                />
                Узнай свои ценности
              </div>
            </li>
            <li className="pb-4">
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 ease-in-out">
                <Image
                  src={"/icons/checkmark.svg"}
                  alt="checkmark"
                  width={40}
                  height={40}
                />
                Сравни с ценностями партнера
              </div>
            </li>
            <li className="pb-4">
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 ease-in-out">
                <Image
                  src={"/icons/checkmark.svg"}
                  alt="checkmark"
                  width={40}
                  height={40}
                />
                расчёт совместимости ценностей с партнёрами (200 человек/год)
              </div>
            </li>
            <li className="pb-4">
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 ease-in-out">
                <Image
                  src={"/icons/checkmark.svg"}
                  alt="checkmark"
                  width={40}
                  height={40}
                />
                3 консультации онлайн по результатам опроса по 1 часу{" "}
              </div>
            </li>
            <li className="pb-4">
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 ease-in-out">
                <Image
                  src={"/icons/checkmark.svg"}
                  alt="checkmark"
                  width={40}
                  height={40}
                />
                доступ на вебинары
              </div>
            </li>
          </ul>
          <Button className="rounded-[40px]">14 900 ₽/ год</Button>
        </div>
      </div>
    </div>
  );
};

export default Survey;
