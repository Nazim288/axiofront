"use client";

import {
  EXTENDED_TEST_RESULT,
  getPaymentTariff,
  updatePaymentTariff,
} from "@/api/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TariffPrice from "@/components/tariffs/tariffPrice";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AdminPaymentTariff = () => {
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [currency, setCurrency] = useState("₽");
  const [priceInput, setPriceInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTariff = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await getPaymentTariff(EXTENDED_TEST_RESULT);
        setCurrentPrice(response.data.price);
        setCurrency(response.data.currency);
        setPriceInput(String(response.data.price));
      } catch (loadError) {
        console.error("Ошибка при загрузке тарифа:", loadError);
        setError("Не удалось загрузить текущую цену");
      } finally {
        setIsLoading(false);
      }
    };

    loadTariff();
  }, []);

  const handleSave = async () => {
    const price = Number(priceInput.replace(",", "."));

    if (!Number.isFinite(price) || price <= 0) {
      toast.error("Введите корректную цену");
      return;
    }

    setIsSaving(true);

    try {
      const response = await updatePaymentTariff({
        productType: EXTENDED_TEST_RESULT,
        price,
      });
      setCurrentPrice(response.data.price);
      setCurrency(response.data.currency);
      setPriceInput(String(response.data.price));
      toast.success("Цена обновлена");
    } catch (saveError) {
      console.error("Ошибка при обновлении тарифа:", saveError);
      const apiMessage = axios.isAxiosError(saveError)
        ? (saveError.response?.data as { message?: string } | undefined)
            ?.message
        : undefined;
      toast.error(apiMessage ?? "Не удалось обновить цену");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative max-w-md overflow-hidden rounded-3xl border border-border bg-white p-6 baseShadow sm:p-8">
      <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Цена полного отчёта
      </p>
      {isLoading ? (
        <p className="mt-3 text-xl text-muted-foreground">Загрузка...</p>
      ) : error ? (
        <p className="mt-3 text-sm text-destructive">{error}</p>
      ) : (
        <TariffPrice
          price={currentPrice}
          currency={currency}
          currentClassName="text-4xl font-bold"
        />
      )}

      <div className="mt-6 flex flex-col gap-3">
        <Input
          type="number"
          min="1"
          step="1"
          value={priceInput}
          onChange={(event) => setPriceInput(event.target.value)}
          placeholder="Новая цена"
          className="bg-muted"
          disabled={isLoading || isSaving}
        />
        <Button onClick={handleSave} disabled={isLoading || isSaving}>
          {isSaving ? "Сохранение..." : "Сохранить цену"}
        </Button>
      </div>
    </div>
  );
};

export default AdminPaymentTariff;
