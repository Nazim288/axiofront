import { FC } from "react";

interface IFreeReportCard {
  title: string;
  description: string;
}

const FreeReportCard: FC<IFreeReportCard> = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-1 bg-white rounded-3xl p-5 border-primary border">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-md font-normal">{description}</p>
    </div>
  );
};

export default FreeReportCard;
