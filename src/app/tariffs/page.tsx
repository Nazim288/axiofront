"use client";

import { Button } from "@/components/ui/button";
import {
  HeroReveal,
  ScrollRevealItem,
  ScrollRevealStagger,
} from "@/components/motion/scroll-reveal";
import { getScrollVariant } from "@/lib/motion";
import { getTestResult, getTestResultShort } from "@/api/survey";
import { SignInModal } from "@/components/modals/signInModal";
import { useUser } from "@/contexts/UserContext";
import { ITestResultShort } from "@/types/survey";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const TARIFFS = [
  {
    title: "Краткий отчет о ценностях (бесплатно)",
    titleClass: "text-primary",
    description:
      "Познакомьтесь с нашим сервисом — создайте личный кабинет, пройдите опросник и получите сокращённый отчет, где представлены 3 наиболее важные ценности именно для вас. Отличный старт для самопознания без затрат.",
    action: "owned",
  },
  {
    title: "Полный отчет о ценностях",
    titleClass: "text-amber-400",
    description:
      "Получите подробный полный отчет с ранжированием ценностей по их значимости для Вас и рекомендации для гармоничного саморазвития и улучшения взаимодействия с другими людьми.",
    action: "full-report",
  },
  {
    title: "Совместимость по ценностям",
    titleClass: "text-orange-500",
    description:
      "Сравните свои ценности с ценностями другого пользователя. Вы узнаете о сходствах и различиях, а также получите практические рекомендации для улучшения взаимодействия с партнёром в семейных и рабочих условиях.",
    action: "disabled",
  },
] as const;

const TariffsPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useUser();
  const [shortResult, setShortResult] = useState<ITestResultShort | null>(null);
  const [isResultLoading, setIsResultLoading] = useState(false);
  const [isReportLoading, setIsReportLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setShortResult(null);
      setIsResultLoading(false);
      return;
    }

    let isCancelled = false;

    const loadShortResult = async () => {
      setIsResultLoading(true);

      try {
        const response = await getTestResultShort();
        if (!isCancelled) {
          setShortResult(response.data || null);
        }
      } catch (error) {
        if (isCancelled) return;

        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setShortResult(null);
        } else {
          console.error("Ошибка при загрузке результата опроса:", error);
          toast.error("Не удалось проверить результат опроса");
        }
      } finally {
        if (!isCancelled) {
          setIsResultLoading(false);
        }
      }
    };

    loadShortResult();

    return () => {
      isCancelled = true;
    };
  }, [isAuthenticated]);

  const handleFullReportClick = async () => {
    if (isResultLoading || isReportLoading || shortResult?.paid) return;

    if (!shortResult) {
      router.push("/survey");
      return;
    }

    setIsReportLoading(true);

    try {
      const response = await getTestResult(shortResult.id.toString());
      localStorage.setItem("testResult", JSON.stringify(response.data));
      router.push(`/freeReport/${shortResult.id}#report-payment`);
    } catch (error) {
      console.error("Ошибка при получении результатов теста:", error);
      toast.error("Не удалось открыть результаты опроса");
      setIsReportLoading(false);
    }
  };

  const renderAction = (action: (typeof TARIFFS)[number]["action"]) => {
    if (action === "owned") {
      return (
        <Button className="mt-auto" variant="default" disabled>
          Уже у вас
        </Button>
      );
    }

    if (action === "disabled") {
      return (
        <Button className="mt-auto" disabled>
          В разработке
        </Button>
      );
    }

    if (!isAuthenticated) {
      return (
        <SignInModal
          triggerClassName="mt-auto"
          triggerText="990 ₽"
          triggerVariant="default"
        />
      );
    }

    return (
      <Button
        className="mt-auto"
        disabled={isResultLoading || isReportLoading || shortResult?.paid}
        onClick={handleFullReportClick}
      >
        {shortResult?.paid
          ? "Уже у вас"
          : isResultLoading || isReportLoading
            ? "Загрузка..."
            : "990 ₽"}
      </Button>
    );
  };

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
            {renderAction(tariff.action)}
          </ScrollRevealItem>
        ))}
      </ScrollRevealStagger>
    </div>
  );
};

export default TariffsPage;
