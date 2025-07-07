"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface RetakeSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetake?: () => void;
}

export function RetakeSurveyModal({
  isOpen,
  onClose,
  onRetake,
}: RetakeSurveyModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRetakeSurvey = () => {
    setIsLoading(true);

    // Сбрасываем состояние опроса если передана функция
    if (onRetake) {
      onRetake();
    }

    onClose();
    router.push("/survey");
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center">
            Погрешность ввода данных
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-6 py-4">
          <div className="text-center space-y-4">
            <p className="text-lg text-gray-700">
              Просим вас пройти опрос заново
            </p>
            <p className="text-sm text-gray-500">
              Обнаружена погрешность в введенных данных. Для получения
              корректных результатов рекомендуем повторить прохождение опроса.
            </p>
          </div>

          <div className="flex flex-col w-full space-y-3">
            <Button
              onClick={handleRetakeSurvey}
              className="rounded-[40px] w-full"
              disabled={isLoading}
            >
              {isLoading ? "Загрузка..." : "Пройти опрос заново"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
