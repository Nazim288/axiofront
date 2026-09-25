import axios from "axios";
import api from "./api";
import { Urls } from "./urls";

export const EXTENDED_TEST_RESULT = "EXTENDED_TEST_RESULT";

export interface RegisteredUsersCountResponse {
  count: number;
}

export interface PaymentTariff {
  id: number;
  productType: string;
  price: number;
  currency: string;
  active: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentTariffShort {
  price: number;
  productType: string;
  currency: string;
}

export interface UpdatePaymentTariffBody {
  productType: string;
  price: number;
}

export const getRegisteredUsersCount = () =>
  api.get<RegisteredUsersCountResponse>(
    Urls.adminUrls.registeredUsersCount,
  );

export const getPaymentTariff = async (
  productType: string = EXTENDED_TEST_RESULT,
) => {
  try {
    return await api.get<PaymentTariffShort>(
      Urls.surveyUrls.paymentTariff(productType),
    );
  } catch (error) {
    const status = axios.isAxiosError(error) ? error.response?.status : null;
    if (status === 401 || status === 403 || status === 404) {
      return api.get<PaymentTariffShort>(
        Urls.adminUrls.paymentTariff(productType),
      );
    }
    throw error;
  }
};

export const updatePaymentTariff = (body: UpdatePaymentTariffBody) =>
  api.put<PaymentTariff>(Urls.adminUrls.paymentTariffs, body);
