import { formatTariffPrice, OLD_TARIFF_PRICE } from "@/lib/paymentTariff";

type TariffPriceProps = {
  price: number | null;
  currency?: string;
  isLoading?: boolean;
  className?: string;
  currentClassName?: string;
  oldClassName?: string;
};

const TariffPrice = ({
  price,
  currency,
  isLoading = false,
  className = "flex items-baseline gap-3",
  currentClassName = "text-3xl font-bold tracking-tight text-foreground",
  oldClassName = "text-lg font-semibold text-rose-500 line-through decoration-2 decoration-rose-400/80",
}: TariffPriceProps) => {
  return (
    <div className={className}>
      <span className={currentClassName}>
        {isLoading
          ? "..."
          : price !== null
            ? formatTariffPrice(price, currency)
            : "—"}
      </span>
      <span className={oldClassName}>
        {formatTariffPrice(OLD_TARIFF_PRICE)}
      </span>
    </div>
  );
};

export default TariffPrice;
