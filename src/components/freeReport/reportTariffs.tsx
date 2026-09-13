"use client";

import { pay } from "@/api/survey";
import {
  ScrollRevealItem,
  ScrollRevealStagger,
} from "@/components/motion/scroll-reveal";
import { Button } from "@/components/ui/button";
import { useGenderImage } from "@/hooks/useGenderImage";
import { getTrustedPaymentUrl } from "@/lib/payment";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ReportTariffs = () => {
  const params = useParams();
  const router = useRouter();
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
      const checkoutUrl = getTrustedPaymentUrl(paymentUrl);

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

      toast.error(
        apiMessage ?? "Не удалось перейти к оплате. Попробуйте снова.",
      );
      setIsPaymentLoading(false);
    }
  };

  return (
    <ScrollRevealStagger className="flex flex-col justify-start gap-6 rounded-3xl baseShadow p-4 sm:p-6 lg:flex-row lg:gap-4 lg:p-10">
      <ScrollRevealItem
        variant="fade-right"
        className="flex w-full flex-col justify-center gap-4 lg:w-1/2"
      >
        <p>
          Получите подробный <span className="font-semibold">полный отчет</span>{" "}
          о своих ценностях: что для вас самое важное, как ваши ценности
          соотносятся с ожиданиями окружающих и советы по улучшению общения.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            variant="default"
            size="cta"
            className="w-full sm:w-auto"
            onClick={handlePayment}
            disabled={isPaymentLoading}
          >
            {isPaymentLoading ? "Переход к оплате..." : "Приобрести"}
          </Button>
          <Button
            variant="outline"
            size="cta"
            className="w-full sm:w-auto"
            onClick={() => router.push("/tariffs#report-comparison")}
          >
            Что такое полный отчёт
          </Button>
        </div>
      </ScrollRevealItem>
      <ScrollRevealItem variant="fade-left" className="w-full min-w-0 lg:w-1/2">
        <Image
          src={getImage("step_01")}
          alt="Оплата полного отчета"
          width={535}
          height={535}
          className="mx-auto h-auto w-full max-w-[min(535px,100%)]"
        />
      </ScrollRevealItem>
    </ScrollRevealStagger>
  );
};

export default ReportTariffs;
