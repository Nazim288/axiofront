const PRODAMUS_PAYMENT_DOMAIN = "payform.ru";

export const getTrustedPaymentUrl = (paymentUrl: string) => {
  const url = new URL(paymentUrl);
  const isTrustedHost =
    url.hostname === PRODAMUS_PAYMENT_DOMAIN ||
    url.hostname.endsWith(`.${PRODAMUS_PAYMENT_DOMAIN}`);

  if (url.protocol !== "https:" || !isTrustedHost) {
    throw new Error("Получена недоверенная ссылка на оплату");
  }

  return url;
};
