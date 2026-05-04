"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useGenderImage } from "@/hooks/useGenderImage";
import { redeemPromoCode } from "@/api/survey";
import axios from "axios";

const ReportTariffs = () => {
  const params = useParams();
  const router = useRouter();
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [isSubmittingPromo, setIsSubmittingPromo] = useState(false);
  const { getImage } = useGenderImage();

  const getPromoErrorMessage = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const apiMessage = (
        error.response?.data as { message?: string } | undefined
      )?.message;
      if (apiMessage) {
        return apiMessage;
      }
    }
    return "Не удалось применить код доступа. Попробуйте еще раз.";
  };

  const handleApplyPromoCode = async () => {
    const normalizedPromoCode = promoCode.trim();
    const personTestIdFromUrl = Array.isArray(params.id)
      ? params.id[0]
      : params.id;
    const personTestId = Number(personTestIdFromUrl);

    if (!normalizedPromoCode) {
      toast.error("Введите код доступа");
      return;
    }

    if (!personTestIdFromUrl || Number.isNaN(personTestId)) {
      toast.error("Не удалось определить тест из URL");
      return;
    }

    setIsSubmittingPromo(true);
    try {
      await redeemPromoCode({
        code: normalizedPromoCode,
        personTestId,
      });
      toast.success("Код доступа применён");
      setPromoCode("");
      setIsPromoModalOpen(false);
      router.push("/profile");
    } catch (error) {
      console.error("Ошибка применения кода доступа:", error);
      toast.error(getPromoErrorMessage(error));
    } finally {
      setIsSubmittingPromo(false);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-4 justify-start rounded-3xl baseShadow p-4 sm:p-6 lg:p-10">
        <div className="flex flex-col gap-4 w-full lg:w-1/2 justify-center">
          <p>
            Получите подробный отчет о своих ценностях: что для вас самое
            важное, как ваши ценности соотносятся с ожиданиями окружающих и
            советы по улучшению общения.
          </p>
          {/* Оплатите полный отчет и попросите своих друзей тоже пройти опрос. Так
          вы быстрее узнаете, насколько ваши ценности совпадают. Получите
          подробный отчет о своих ценностях: что для вас самое важное, как ваши
          ценности соотносятся с ожиданиями окружающих и советы по улучшению
          общения. */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="default"
              size="cta"
              className="w-full sm:w-auto"
              onClick={() => setIsPromoModalOpen(true)}
            >
              Ввести код доступа
            </Button>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-11 w-11 shrink-0 rounded-full text-muted-foreground hover:text-foreground"
                    aria-label="Справка по коду доступа"
                  >
                    <CircleHelp className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs text-pretty">
                  Для получения кода доступа перейдите в раздел Тарифы.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <Image
            src={getImage("step_01")}
            alt="tariffs"
            width={535}
            height={535}
            className="w-full h-auto max-w-[535px] mx-auto"
          />
        </div>
      </div>
      <Dialog open={isPromoModalOpen} onOpenChange={setIsPromoModalOpen}>
        <DialogContent className="rounded-3xl max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-center">
              Введите код доступа
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <Input
              value={promoCode}
              onChange={(event) => setPromoCode(event.target.value)}
              placeholder="Код доступа"
              className="bg-muted"
            />
            <Button
              onClick={handleApplyPromoCode}
              size="cta"
              className="w-full"
              disabled={isSubmittingPromo}
            >
              {isSubmittingPromo ? "Применение..." : "Использовать код доступа"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReportTariffs;
