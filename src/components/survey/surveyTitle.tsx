import Image from "next/image";

const SurveyTitle = () => {
  return (
    <div className="flex flex-col justify-between gap-7 baseShadow rounded-3xl p-8">
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
