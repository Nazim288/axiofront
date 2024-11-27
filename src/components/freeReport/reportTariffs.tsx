"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ReportTariffs = () => {
  const router = useRouter();
  return (
    <div className="flex gap-4 justify-start h-[600px] rounded-[20px] baseShadow p-10">
      <div className="flex flex-col gap-4 w-[50%] justify-center">
        <p>
          Оформите подписку и попросите своих друзей тоже пройти опрос. Так вы
          быстрее узнаете, насколько ваши ценности совпадают. Получите подробный
          отчет о своих ценностях: что для вас самое важное, как ваши ценности
          соотносятся с ожиданиями окружающих и советы п о улучшению общения.
        </p>
        <Button
          variant="default"
          className="rounded-3xl"
          onClick={() => {
            router.push("/tariffs");
          }}
        >
          Подробнее
        </Button>
      </div>
      <Image
        src={"/images/homePgae/values.png"}
        alt="tariffs"
        width={535}
        height={535}
      />
    </div>
  );
};

export default ReportTariffs;
