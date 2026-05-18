"use client";

import Image from "next/image";
import { useGenderImage } from "@/hooks/useGenderImage";
import {
  ScrollReveal,
  ScrollRevealItem,
  ScrollRevealStagger,
} from "@/components/motion/scroll-reveal";

const valueBoxTop =
  "text-sm sm:text-base lg:text-2xl min-h-10 sm:min-h-[49px] h-auto py-1.5 w-full min-w-0 border shadow-lg rounded-[20px] border-primary flex items-center justify-start px-3 sm:px-5 shake break-words";
const valueBoxMid =
  "text-xs sm:text-sm lg:text-base min-h-9 sm:min-h-10 h-auto py-1 w-full min-w-0 border shadow-lg rounded-[20px] flex items-center justify-start px-3 sm:px-5 shake break-words";
const valueBoxLow =
  "min-h-7 sm:min-h-[30px] h-auto py-1 text-xs sm:text-sm w-full min-w-0 border shadow-lg rounded-[20px] flex items-center justify-start px-3 sm:px-5 shake break-words";

const genderImageClass = "w-full h-auto max-w-[min(300px,100%)] mx-auto";

const Matches = ({
  values,
  matches,
}: {
  values: string[];
  matches: number;
}) => {
  const { getImage } = useGenderImage();

  const niValues = values.slice(0, 10);
  const ipValues = values.slice(10, 20);

  const renderValueRows = (rowValues: string[]) => (
    <div className="flex flex-col gap-1 w-full max-w-[310px] mx-auto min-w-0">
      {rowValues.map((value, index) => {
        const rank = index + 1;
        const boxClass =
          rank <= 3 ? valueBoxTop : rank <= 7 ? valueBoxMid : valueBoxLow;

        return (
          <div
            key={rank}
            className="flex justify-between items-center gap-2 min-w-0"
          >
            <p className="shrink-0">{rank}</p>
            <div className={boxClass}>{value || "Не определено"}</div>
          </div>
        );
      })}
    </div>
  );

  return (
    <ScrollReveal
      variant="blur-up"
      className="flex flex-col gap-2 baseShadow rounded-3xl p-4 sm:p-5 w-full min-w-0 hover:scale-105 transition-transform duration-300 ease-in-out"
    >
      <h1 className="text-center font-semibold text-2xl sm:text-3xl lg:text-4xl">
        <span className="block text-base sm:text-lg lg:text-xl font-normal">
          Согласованность ваших ценностей по уровням:
        </span>
        {matches}%
      </h1>
      <ScrollRevealStagger className="flex flex-col lg:flex-row lg:justify-around gap-6">
        <ScrollRevealItem variant="fade-right" className="flex flex-col gap-2 w-full min-w-0">
          <Image
            src={getImage("report_step_06")}
            alt="report"
            width={300}
            height={300}
            className={genderImageClass}
          />
          <div className="flex flex-col gap-3">
            <p className="text-center font-semibold text-lg sm:text-xl lg:text-2xl">
              Я считаю...
            </p>
            {renderValueRows(niValues)}
          </div>
        </ScrollRevealItem>

        <ScrollRevealItem variant="fade-left" className="flex flex-col gap-2 w-full min-w-0">
          <Image
            src={getImage("report_step_07")}
            alt="report"
            width={300}
            height={300}
            className={genderImageClass}
          />
          <div className="flex flex-col gap-3">
            <p className="text-center font-semibold text-lg sm:text-xl lg:text-2xl">
              От меня ждут...
            </p>
            {renderValueRows(ipValues)}
          </div>
        </ScrollRevealItem>
      </ScrollRevealStagger>
      <p className="text-xs sm:text-sm text-muted-foreground">
        *от наиболее важной к наименее важной ценности
      </p>
    </ScrollReveal>
  );
};

export default Matches;
