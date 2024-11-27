import { InfoIcon } from "lucide-react";
import { FC } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface IFreeReportCard {
  title: string;
  description: string;
  color: string;
}

const FreeReportCard: FC<IFreeReportCard> = ({ title, description, color }) => {
  const style = {
    width: "284px",
    height: "100px",
    backgroundColor: color,
    borderRadius: "10px",
    border: "none",
  };

  return (
    <div className="flex flex-col gap-1 bg-white rounded-3xl p-5 border-primary border relative">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-md font-normal">{description}</p>
      <Popover>
        <PopoverTrigger className="absolute top-3 right-3">
          <InfoIcon className="w-6 h-6 text-primary" />
        </PopoverTrigger>
        <PopoverContent>
          <div style={style}></div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FreeReportCard;
