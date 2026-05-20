import Image from "next/image";
import { useState, useEffect } from "react";
import { ISurveyData } from "@/types/survey";

const SurveyTitle = ({
  data,
  step,
}: {
  data: ISurveyData | undefined;
  step: number;
}) => {
  const [isMobile, setIsMobile] = useState(false);

  const { header, leftText, rightText } = data?.questionGroups.find(
    (group) => group.position === step
  ) ?? { header: "", leftText: "", rightText: "" };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    // Инициализация при монтировании
    handleResize();

    // Добавляем слушатель изменения размера окна
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col justify-between gap-4 py-4 baseShadow rounded-3xl px-4 md:px-8 bg-white max-w-[1020px] mx-auto">
      <h1 className="text-xl md:text-2xl font-bold text-center md:text-left">
        {header}
      </h1>
      <div className="flex justify-between items-center">
        <p className="text-xs sm:text-sm md:text-base max-w-[45%]">
          {leftText}
        </p>
        <p className="text-xs sm:text-sm md:text-base max-w-[45%] text-right">
          {rightText}
        </p>
      </div>
      <div className="relative w-full h-[30px] md:h-[58px]">
        <Image
          src={
            isMobile ? "/icons/surveyTitleMob.svg" : "/icons/surveyTitle.svg"
          }
          alt="surveyTitle"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default SurveyTitle;
