"use client";

import { Check, Minus } from "lucide-react";
import {
  ScrollReveal,
  ScrollRevealItem,
  ScrollRevealStagger,
} from "@/components/motion/scroll-reveal";
import TariffPrice from "@/components/tariffs/tariffPrice";

const REPORT_COMPARISON = [
  {
    free: "Три ведущие ценности",
    full: "Рейтинг всех 10 ценностей",
  },
  {
    free: "Краткое описание (три наиболее важные ценности)",
    full: "Рейтинг ценностей по двум уровням: Убеждения и Поведения",
  },
  {
    free: null,
    full: "Показатель согласованности",
  },
  {
    free: null,
    full: "Анализ значимых расхождений",
  },
  {
    free: null,
    full: "Персональные рекомендации",
  },
  {
    free: null,
    full: "PDF-отчёт, который можно скачать и сохранить",
  },
] as const;

type FeatureCellProps = {
  text: string | null;
  tone?: "muted" | "accent";
};

const FeatureCell = ({ text, tone = "muted" }: FeatureCellProps) => {
  if (!text) {
    return (
      <span className="inline-flex items-center gap-2 text-muted-foreground/50">
        <Minus className="h-4 w-4 shrink-0" aria-hidden />
        <span className="sr-only">Недоступно</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-start gap-2.5 text-left">
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
          tone === "accent"
            ? "bg-amber-500 text-white"
            : "bg-primary/15 text-primary"
        }`}
      >
        <Check className="h-3.5 w-3.5" aria-hidden />
      </span>
      <span className="leading-snug">{text}</span>
    </span>
  );
};

type ReportComparisonProps = {
  id?: string;
  className?: string;
  price?: number | null;
  currency?: string;
  isPriceLoading?: boolean;
};

const ReportComparison = ({
  id = "report-comparison",
  className = "",
  price = null,
  currency,
  isPriceLoading = false,
}: ReportComparisonProps) => {
  return (
    <section id={id} className={`scroll-mt-24 w-full ${className}`}>
      <ScrollReveal variant="fade-up" className="mb-6 text-center sm:mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Сравнение
        </p>
        <h2 className="text-3xl font-bold sm:text-4xl">
          Краткий и Полный отчёт
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Посмотрите, чем бесплатный результат отличается от полного
          индивидуального отчёта.
        </p>
      </ScrollReveal>

      <ScrollRevealStagger
        className="mx-auto grid w-full max-w-5xl gap-4 lg:grid-cols-2"
        stagger={0.08}
      >
        <ScrollRevealItem variant="fade-right">
          <article className="flex h-full flex-col overflow-hidden rounded-[28px] border border-border/70 bg-white baseShadow">
            <div className="border-b border-border/70 bg-muted/40 px-5 py-5 sm:px-6">
              <p className="text-sm font-medium text-muted-foreground">
                Бесплатно
              </p>
              <h3 className="mt-1 text-2xl font-semibold text-primary">
                Краткий отчёт
              </h3>
            </div>
            <ul className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
              {REPORT_COMPARISON.map((row) => (
                <li key={`free-${row.full}`} className="text-sm sm:text-base">
                  <FeatureCell text={row.free} />
                </li>
              ))}
            </ul>
          </article>
        </ScrollRevealItem>

        <ScrollRevealItem variant="fade-left">
          <article className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-amber-200 bg-gradient-to-b from-amber-50 to-white baseShadow">
            <div className="absolute right-4 top-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
              Рекомендуем
            </div>
            <div className="border-b border-amber-200/80 bg-amber-100/70 px-5 py-5 sm:px-6">
              <TariffPrice
                price={price}
                currency={currency}
                isLoading={isPriceLoading}
                currentClassName="text-3xl font-bold text-amber-700"
              />
              <h3 className="mt-1 text-2xl font-semibold text-amber-800">
                Полный отчёт
              </h3>
            </div>
            <ul className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
              {REPORT_COMPARISON.map((row) => (
                <li key={`full-${row.full}`} className="text-sm sm:text-base">
                  <FeatureCell text={row.full} tone="accent" />
                </li>
              ))}
            </ul>
          </article>
        </ScrollRevealItem>
      </ScrollRevealStagger>
    </section>
  );
};

export default ReportComparison;
