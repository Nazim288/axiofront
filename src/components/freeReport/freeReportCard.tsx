import { FC } from "react";
interface IFreeReportCard {
  title: string;
  description: string;
}

const FreeReportCard: FC<IFreeReportCard> = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-2 bg-card rounded-3xl p-5 sm:p-6 border border-primary/30 relative">
      <h1 className="text-xl sm:text-2xl font-semibold">{title}</h1>
      <p className="text-base font-normal text-muted-foreground">{description}</p>
    </div>
  );
};

export default FreeReportCard;
