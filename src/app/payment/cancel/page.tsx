"use client";

import { pay } from "@/api/survey";
import { Button } from "@/components/ui/button";
import { getTrustedPaymentUrl } from "@/lib/payment";
import axios from "axios";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const PaymentCancelPage = () => {
  const [personTestId, setPersonTestId] = useState<number | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    try {
      const storedPayment = JSON.parse(
        localStorage.getItem("lastPayment") ?? "{}",
      ) as { personTestId?: number };

      if (storedPayment.personTestId) {
        setPersonTestId(storedPayment.personTestId);
      }
    } catch {
      localStorage.removeItem("lastPayment");
    }
  }, []);

  const handleRetry = async () => {
    if (!personTestId) {
      window.location.assign("/tariffs");
      return;
    }

    setIsRetrying(true);

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
      console.error("Ошибка повторной инициализации платежа:", error);

      const apiMessage = axios.isAxiosError(error)
        ? (error.response?.data as { message?: string } | undefined)?.message
        : undefined;

      toast.error(apiMessage ?? "Не удалось перейти к оплате. Попробуйте снова.");
      setIsRetrying(false);
    }
  };

  const orderUrl = personTestId
    ? `/freeReport/${personTestId}#report-payment`
    : "/tariffs";

  return (
    <div className="flex min-h-[60vh] items-center justify-center py-10">
      <section className="baseShadow flex w-full max-w-xl flex-col items-center gap-6 rounded-3xl p-6 text-center sm:p-10">
        <XCircle className="h-16 w-16 text-destructive" aria-hidden />

        <div className="space-y-3">
          <h1 className="text-3xl font-bold">Оплата не была завершена</h1>
          <p className="text-muted-foreground">
            Вы можете повторить оплату или вернуться к своему заказу.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-72">
          <Button size="cta" onClick={handleRetry} disabled={isRetrying}>
            {isRetrying ? "Переход к оплате..." : "Попробовать оплатить снова"}
          </Button>
          <Button variant="outline" asChild>
            <Link href={orderUrl}>Вернуться к заказу</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/">На главную</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PaymentCancelPage;
