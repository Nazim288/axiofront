"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useParams } from "next/navigation";
import { pay } from "@/api/survey";
import { useState } from "react";
import { toast } from "sonner";
import { useGenderImage } from "@/hooks/useGenderImage";

const ReportTariffs = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { getImage } = useGenderImage();

  const handlePayment = async () => {
    const personTestId = params.id as string;

    if (!personTestId) {
      console.error("personTestId не найден в URL");
      return;
    }

    setIsLoading(true);

    try {
      const paymentData = {
        personTestId: parseInt(personTestId),
        amount: 1000, // Сумма в копейках (например, 10.00 руб)
        paymentMethod: "CREDIT_CARD" as const,
        currency: "RUB",
      };

      await pay(paymentData);

      // Показываем уведомление об успешной оплате
      toast.success("Отчет оплачен", {
        description: "Теперь вы можете просмотреть полный отчет",
      });
    } catch (error) {
      console.error("Ошибка при инициализации платежа:", error);
      toast.error("Ошибка оплаты", {
        description: "Не удалось обработать платеж. Попробуйте еще раз.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-4 justify-start h-[600px] rounded-[20px] baseShadow p-10">
      <div className="flex flex-col gap-4 w-[50%] justify-center">
        <p>
          Оплатите полный отчет и попросите своих друзей тоже пройти опрос. Так
          вы быстрее узнаете, насколько ваши ценности совпадают. Получите
          подробный отчет о своих ценностях: что для вас самое важное, как ваши
          ценности соотносятся с ожиданиями окружающих и советы по улучшению
          общения.
        </p>
        <Button
          variant="default"
          className="rounded-3xl"
          onClick={handlePayment}
          disabled={isLoading}
        >
          {isLoading ? "Обработка..." : "Оплатить"}
        </Button>
      </div>
      <Image src={getImage("step_01")} alt="tariffs" width={535} height={535} />
    </div>
  );
};

export default ReportTariffs;
