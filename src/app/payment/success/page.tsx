"use client";

import { getPaymentStatus } from "@/api/survey";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const SUCCESS_STATUSES = new Set(["PAID", "SUCCESS", "SUCCEEDED", "COMPLETED"]);
const FAILED_STATUSES = new Set(["CANCELLED", "CANCELED", "FAILED", "ERROR"]);

const PaymentSuccessPage = () => {
  const [status, setStatus] = useState("PROCESSING");

  useEffect(() => {
    const queryPaymentId = new URLSearchParams(window.location.search).get(
      "paymentId",
    );
    let storedPaymentId: number | undefined;

    try {
      const storedPayment = JSON.parse(
        localStorage.getItem("lastPayment") ?? "{}",
      ) as { paymentId?: number };
      storedPaymentId = storedPayment.paymentId;
    } catch {
      localStorage.removeItem("lastPayment");
    }

    const paymentId = Number(queryPaymentId ?? storedPaymentId);
    if (!paymentId || Number.isNaN(paymentId)) return;

    let isCancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const checkStatus = async () => {
      try {
        const response = await getPaymentStatus(paymentId);
        if (isCancelled) return;

        const currentStatus =
          typeof response.data === "string"
            ? response.data
            : response.data.status;
        const normalizedStatus = currentStatus.toUpperCase();
        setStatus(normalizedStatus);

        if (
          !SUCCESS_STATUSES.has(normalizedStatus) &&
          !FAILED_STATUSES.has(normalizedStatus)
        ) {
          timeoutId = setTimeout(checkStatus, 2000);
        }
      } catch (error) {
        console.error("Ошибка проверки статуса платежа:", error);
        if (!isCancelled) {
          timeoutId = setTimeout(checkStatus, 3000);
        }
      }
    };

    checkStatus();

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  const isPaid = SUCCESS_STATUSES.has(status);
  const isFailed = FAILED_STATUSES.has(status);

  return (
    <div className="flex min-h-[60vh] items-center justify-center py-10">
      <section className="baseShadow flex w-full max-w-xl flex-col items-center gap-6 rounded-3xl p-6 text-center sm:p-10">
        {isPaid ? (
          <CheckCircle2 className="h-16 w-16 text-primary" aria-hidden />
        ) : isFailed ? (
          <XCircle className="h-16 w-16 text-destructive" aria-hidden />
        ) : (
          <Loader2 className="h-16 w-16 animate-spin text-primary" aria-hidden />
        )}

        <div className="space-y-3">
          <h1 className="text-3xl font-bold">Спасибо за оплату!</h1>
          <p className="text-lg">Мы получили информацию о вашем платеже.</p>
          {isPaid ? (
            <p className="text-muted-foreground">Оплата успешно подтверждена.</p>
          ) : isFailed ? (
            <p className="text-destructive">
              Платёж не подтверждён. Попробуйте оплатить снова.
            </p>
          ) : (
            <>
              <p className="text-muted-foreground">
                Сейчас проверяем его статус.
              </p>
              <p className="text-sm text-muted-foreground">
                Обычно это занимает несколько секунд.
              </p>
            </>
          )}
        </div>

        {isPaid ? (
          <Button size="cta" asChild>
            <Link href="/profile">Посмотреть оплаченный отчёт</Link>
          </Button>
        ) : isFailed ? (
          <Button size="cta" asChild>
            <Link href="/payment/cancel">Попробовать оплатить снова</Link>
          </Button>
        ) : null}
      </section>
    </div>
  );
};

export default PaymentSuccessPage;
