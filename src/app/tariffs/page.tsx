"use client";

import { Button } from "@/components/ui/button";
import {
  HeroReveal,
  ScrollReveal,
  ScrollRevealItem,
  ScrollRevealStagger,
} from "@/components/motion/scroll-reveal";
import { getScrollVariant } from "@/lib/motion";
import { getTestResult, getTestResultShort } from "@/api/survey";
import { SignInModal } from "@/components/modals/signInModal";
import ReportComparison from "@/components/tariffs/reportComparison";
import { useUser } from "@/contexts/UserContext";
import { ITestResultShort } from "@/types/survey";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const TARIFFS = [
  {
    title: "Краткий отчёт о ценностях (бесплатно)",
    titleClass: "text-primary",
    description:
      "Познакомьтесь с нашим сервисом — создайте личный кабинет, пройдите опросник и получите сокращённый отчёт, где представлены 3 наиболее важные ценности именно для вас. Отличный старт для самопознания без затрат.",
    action: "owned",
  },
  {
    title: "Полный отчёт о ценностях",
    titleClass: "text-amber-500",
    description:
      "Получите подробный полный отчёт с ранжированием ценностей по их значимости для Вас и рекомендации для гармоничного саморазвития и улучшения взаимодействия с другими людьми.",
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

const DiscountPrice = () => (
  <div className="flex items-baseline gap-3">
    <span className="text-3xl font-bold tracking-tight text-foreground">
      990 ₽
    </span>
    <span className="text-lg font-semibold text-rose-500 line-through decoration-2 decoration-rose-400/80">
      2500 ₽
    </span>
  </div>
);

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

  useEffect(() => {
    if (window.location.hash !== "#report-comparison") return;

    const timeoutId = window.setTimeout(() => {
      document.getElementById("report-comparison")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const scrollToComparison = () => {
    document.getElementById("report-comparison")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handlePurchaseClick = async () => {
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

    if (shortResult?.paid) {
      return (
        <div className="mt-auto flex flex-col gap-3">
          <DiscountPrice />
          <Button disabled>Уже у вас</Button>
        </div>
      );
    }

    return (
      <div className="mt-auto flex flex-col gap-3">
        <DiscountPrice />
        {!isAuthenticated ? (
          <SignInModal
            triggerClassName="w-full"
            triggerText="Приобрести"
            triggerVariant="default"
          />
        ) : (
          <Button
            className="w-full"
            disabled={isResultLoading || isReportLoading}
            onClick={handlePurchaseClick}
          >
            {isResultLoading || isReportLoading ? "Загрузка..." : "Приобрести"}
          </Button>
        )}
        <Button
          variant="outline"
          className="w-full"
          onClick={scrollToComparison}
        >
          Что такое полный отчёт
        </Button>
      </div>
    );
  };

  return (
    <div className="flex w-full flex-col items-center">
      <HeroReveal variant="blur-up" className="w-full text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">Тарифы</h1>
      </HeroReveal>
      <ScrollRevealStagger
        className="mx-auto mt-10 flex w-full max-w-6xl flex-wrap justify-center gap-6 lg:mt-14"
        stagger={0.1}
      >
        {TARIFFS.map((tariff, index) => (
          <ScrollRevealItem
            key={tariff.title}
            variant={getScrollVariant(index)}
            className="flex h-fit w-full max-w-[360px] flex-col gap-5 rounded-3xl baseShadow p-5 transition-transform duration-300 ease-in-out hover:scale-105 sm:max-w-[calc(50%-12px)] lg:w-[320px] lg:max-w-[360px]"
          >
            <div className="flex h-[100px] justify-between">
              <h2 className={`text-2xl font-semibold ${tariff.titleClass}`}>
                {tariff.title}
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-600">
              {tariff.description}
            </p>
            {renderAction(tariff.action)}
          </ScrollRevealItem>
        ))}
      </ScrollRevealStagger>

      <ScrollReveal variant="fade-up" className="mt-16 w-full lg:mt-20">
        <ReportComparison />
      </ScrollReveal>
    </div>
  );
};

export default TariffsPage;
