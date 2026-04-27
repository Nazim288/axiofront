import { FC } from "react";

interface IStandartReportCard {
  title: string;
  description: string;
  number: number;
  priority: number;
}

const StandartReportCard: FC<IStandartReportCard> = ({
  title,
  description,
  number,
  priority,
}) => {
  const priorityColor =
    priority === 1
      ? "bg-lime-500"
      : priority === 2
      ? "bg-amber-400"
      : "bg-orange-500";

  const priorityText =
    priority === 1
      ? "Наиболее важная ценность"
      : priority === 2
      ? "Менее важная ценность"
      : "Антиценность";

  return (
    <div className="flex flex-col gap-3 rounded-3xl p-5 sm:p-6 baseShadow w-full hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="flex justify-between">
        <p className="text-xl sm:text-2xl font-semibold">{number}</p>
        <div className={`${priorityColor} rounded-full px-4 py-1 text-sm sm:text-base font-medium`}>
          {priorityText}
        </div>
      </div>
      <h1 className="text-xl sm:text-2xl font-semibold">{title}</h1>
      <p className="text-base font-normal text-muted-foreground">{description}</p>
    </div>
  );
};

export default StandartReportCard;
