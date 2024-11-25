import Image from "next/image";
import { useState, useEffect } from "react";

const SurveyTitle = () => {
  const [gapSize, setGapSize] = useState(28); // Начальное значение gap в пикселях

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
      <h1 className="text-4xl font-bold text-start max-w-[70%]">
        Оцените насколько важны для вас ценности, как руководство в жизни
      </h1>
      <div className="flex justify-between">
        <p>Абсолютно не важная ценность</p>
        <p>Исключительно важная ценность</p>
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
