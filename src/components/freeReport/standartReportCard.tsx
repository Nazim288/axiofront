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
      ? "bg-[#8BC34A]"
      : priority === 2
      ? "bg-[#FFC727]"
      : "bg-[#FF9800]";

  const priorityText =
    priority === 1
      ? "Наиболее важная ценность"
      : priority === 2
      ? "Менее важная ценность"
      : "Антиценность";

  return (
    <div className="flex flex-col gap-2 rounded-3xl p-5 baseShadow w-full hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="flex justify-between">
        <p className="text-2xl font-semibold">{number}</p>
        <div className={`${priorityColor} rounded-full px-4 py-1 font-md`}>
          {priorityText}
        </div>
      </div>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-md font-normal">{description}</p>
    </div>
  );
};

export default StandartReportCard;
