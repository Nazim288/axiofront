"use client";

import {
  EXTENDED_TEST_RESULT,
  getPaymentTariff,
  type PaymentTariffShort,
} from "@/api/admin";
import { useEffect, useState } from "react";

export const usePaymentTariff = (
  productType: string = EXTENDED_TEST_RESULT,
) => {
  const [tariff, setTariff] = useState<PaymentTariffShort | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCancelled = false;

    const loadTariff = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await getPaymentTariff(productType);
        if (!isCancelled) {
          setTariff(response.data);
        }
      } catch (loadError) {
        console.error("Ошибка при загрузке тарифа:", loadError);
        if (!isCancelled) {
          setError("Не удалось загрузить цену");
          setTariff(null);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadTariff();

    return () => {
      isCancelled = true;
    };
  }, [productType]);

  return { tariff, isLoading, error };
};
