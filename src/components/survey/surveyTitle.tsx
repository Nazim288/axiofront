import Image from "next/image";
import { useState, useEffect } from "react";
import { ISurveyData } from "@/types/survey";

const SurveyTitle = ({ data, step }: { data: ISurveyData; step: number }) => {
  const [gapSize, setGapSize] = useState(28);
  const { header, leftText, rightText } = data.questionGroups.find(
    (group) => group.position === step
  ) ?? { header: "", leftText: "", rightText: "" };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newGapSize = scrollPosition > 100 ? 16 : 28;

      setGapSize(newGapSize);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        gap: `${gapSize}px`,
        transition: "gap 0.3s ease, padding 0.3s ease",
        paddingTop: `${gapSize}px`,
        paddingBottom: `${gapSize}px`,
      }}
      className="flex flex-col justify-between baseShadow rounded-3xl px-8 bg-white z-20 max-w-[1020px]"
    >
      <h1 className="text-2xl font-bold">{header}</h1>
      <div className="flex justify-between">
        <p>{leftText}</p>
        <p>{rightText}</p>
      </div>
      <Image
        src={"/icons/surveyTitle.svg"}
        alt="surveyTitle"
        width={1319}
        height={58}
        className=""
      />
    </div>
  );
};

export default SurveyTitle;
