"use client";

import { pay } from "@/api/survey";
import {
  ScrollRevealItem,
  ScrollRevealStagger,
} from "@/components/motion/scroll-reveal";
import { Button } from "@/components/ui/button";
import { useGenderImage } from "@/hooks/useGenderImage";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ReportTariffs = () => {
  const params = useParams();
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const { getImage } = useGenderImage();

  useEffect(() => {
    if (window.location.hash !== "#report-payment") return;

    const animationFrame = window.requestAnimationFrame(() => {
      document.getElementById("report-payment")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  const handlePayment = async () => {
    const personTestIdFromUrl = Array.isArray(params.id)
      ? params.id[0]
      : params.id;
    const personTestId = Number(personTestIdFromUrl);

    if (!personTestIdFromUrl || Number.isNaN(personTestId)) {
      toast.error("Не удалось определить тест из URL");
      return;
    }

    setIsPaymentLoading(true);

    try {
      const response = await pay({ personTestId });
      const { paymentId, paymentUrl } = response.data;
      const checkoutUrl = new URL(paymentUrl);

      if (!["http:", "https:"].includes(checkoutUrl.protocol)) {
        throw new Error("Некорректная ссылка на оплату");
      }

      localStorage.setItem(
        "lastPayment",
        JSON.stringify({ paymentId, personTestId }),
      );
      window.location.assign(checkoutUrl.toString());
    } catch (error) {
      console.error("Ошибка инициализации платежа:", error);

      const apiMessage = axios.isAxiosError(error)
        ? (error.response?.data as { message?: string } | undefined)?.message
        : undefined;

      toast.error(apiMessage ?? "Не удалось перейти к оплате. Попробуйте снова.");
      setIsPaymentLoading(false);
    }
  };

  return (
    <ScrollRevealStagger className="flex flex-col lg:flex-row gap-6 lg:gap-4 justify-start rounded-3xl baseShadow p-4 sm:p-6 lg:p-10">
      <ScrollRevealItem
        variant="fade-right"
        className="flex flex-col gap-4 w-full lg:w-1/2 justify-center"
      >
        <p>
          Получите подробный <span className="font-semibold">полный отчет</span>{" "}
          о своих ценностях: что для вас самое важное, как ваши ценности
          соотносятся с ожиданиями окружающих и советы по улучшению общения.
        </p>
        <Button
          variant="default"
          size="cta"
          className="w-full sm:w-auto"
          onClick={handlePayment}
          disabled={isPaymentLoading}
        >
          {isPaymentLoading ? "Переход к оплате..." : "Оплатить"}
        </Button>
      </ScrollRevealItem>
      <ScrollRevealItem variant="fade-left" className="w-full min-w-0 lg:w-1/2">
        <Image
          src={getImage("step_01")}
          alt="Оплата полного отчета"
          width={535}
          height={535}
          className="w-full h-auto max-w-[min(535px,100%)] mx-auto"
        />
      </ScrollRevealItem>
    </ScrollRevealStagger>
  );
};

export default ReportTariffs;
