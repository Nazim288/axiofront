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
import { getTestResult } from "@/api/survey";

interface CongratulationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  personTestId: number | null;
}

export function CongratulationsModal({
  isOpen,
  onClose,
  personTestId,
}: CongratulationsModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleViewResults = async () => {
    if (!personTestId) {
      console.error("personTestId отсутствует");
      return;
    }

    setIsLoading(true);

    try {
      const response = await getTestResult(personTestId.toString());
      // Сохраняем данные в localStorage для передачи на страницу отчета
      localStorage.setItem("testResult", JSON.stringify(response.data));
      onClose();
      router.push(`/freeReport/${personTestId}`);
    } catch (error) {
      console.error("Ошибка при получении результатов теста:", error);
    } finally {
      setIsLoading(false);
    }
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
            Поздравляем!
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-6 py-4">
          <div className="text-center space-y-4">
            <p className="text-lg text-gray-700">Вы успешно прошли опрос!</p>
            <p className="text-sm text-gray-500">
              Теперь вы можете посмотреть результаты анализа ваших ответов
            </p>
          </div>

          <Button
            onClick={handleViewResults}
            className="rounded-[40px] w-full"
            disabled={isLoading}
          >
            {isLoading ? "Загрузка..." : "Посмотреть результат"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
