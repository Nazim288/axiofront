import Image from "next/image";
import { useGenderImage } from "@/hooks/useGenderImage";

const Matches = ({
  values,
  matches,
}: {
  values: string[];
  matches: number;
}) => {
  const { getImage } = useGenderImage();

  // Разделяем значения на два массива: первые 10 для "Я считаю", последние 10 для "От меня ждут"
  const niValues = values.slice(0, 10); // ni - что я считаю
  const ipValues = values.slice(10, 20); // ip - что от меня ждут

  return (
    <div className="flex flex-col gap-2 baseShadow rounded-3xl p-5 w-full hover:scale-105 transition-transform duration-300 ease-in-out">
      <h1 className="text-center font-semibold text-3xl sm:text-4xl">
        <span className="!text-xl">
          {" "}
          Согласованность ваших ценностей по уровням:
        </span>
        <br /> {matches}%
      </h1>
      <div className="flex flex-col lg:flex-row lg:justify-around gap-6">
        <div className="flex flex-col gap-2">
          <Image
            src={getImage("report_step_06")}
            alt="report"
            width={300}
            height={300}
            className="w-full h-auto max-w-[300px] mx-auto"
          />
          <div className="flex flex-col gap-3">
            <p className="text-center font-semibold text-2xl">Я считаю...</p>
            <div className="flex flex-col gap-1 w-full max-w-[310px] mx-auto">
              <div className="flex justify-between items-center gap-2">
                <p>1</p>
                <div className="text-[24px] h-[49px] w-full border shadow-lg rounded-[20px] border-primary flex items-center justify-start px-5 shake">
                  {niValues[0] || "Не определено"}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>2</p>
                <div className="text-[24px] h-[49px] w-full border shadow-lg rounded-[20px] border-primary flex items-center justify-start px-5 shake">
                  {niValues[1] || "Не определено"}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>3</p>
                <div className="text-[24px] h-[49px] w-full border shadow-lg rounded-[20px] border-primary flex items-center justify-start px-5 shake">
                  {niValues[2] || "Не определено"}
                </div>
              </div>

              <div className="flex justify-between items-center gap-2">
                <p>4</p>
                <div className="text-[20px] h-10 w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {niValues[3] || "Не определено"}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>5</p>
                <div className="text-[20px] h-10 w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {niValues[4] || "Не определено"}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>6</p>
                <div className="text-[20px] h-10 w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {niValues[5] || "Не определено"}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>7</p>
                <div className="text-[20px] h-10 w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {niValues[6] || "Не определено"}
                </div>
              </div>

              <div className="flex justify-between items-center gap-2">
                <p>8</p>
                <div className="h-[30px] w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {niValues[7] || "Не определено"}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>9</p>
                <div className="h-[30px] w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {niValues[8] || "Не определено"}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>10</p>
                <div className="h-[30px] w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {niValues[9] || "Не определено"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Image
            src={getImage("report_step_07")}
            alt="report"
            width={300}
            height={300}
            className="w-full h-auto max-w-[300px] mx-auto"
          />
          <div className="flex flex-col gap-3">
            <p className="text-center font-semibold text-2xl">
              От меня ждут...
            </p>
            <div className="flex flex-col gap-1 w-full max-w-[310px] mx-auto">
              <div className="flex justify-between items-center gap-2">
                <p>1</p>
                <div className="text-[24px] h-[49px] w-full border shadow-lg rounded-[20px] border-primary flex items-center justify-start px-5 shake">
                  {ipValues[0] || "Не определено"}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>2</p>
                <div className="text-[24px] h-[49px] w-full border shadow-lg rounded-[20px] border-primary flex items-center justify-start px-5 shake">
                  {ipValues[1] || "Не определено"}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>3</p>
                <div className="text-[24px] h-[49px] w-full border shadow-lg rounded-[20px] border-primary flex items-center justify-start px-5 shake">
                  {ipValues[2] || "Не определено"}
                </div>
              </div>

              <div className="flex justify-between items-center gap-2">
                <p>4</p>
                <div className="text-[20px] h-10 w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {ipValues[3] || "Не определено"}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>5</p>
                <div className="text-[20px] h-10 w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {ipValues[4] || "Не определено"}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>6</p>
                <div className="text-[20px] h-10 w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {ipValues[5] || "Не определено"}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>7</p>
                <div className="text-[20px] h-10 w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {ipValues[6] || "Не определено"}
                </div>
              </div>

              <div className="flex justify-between items-center gap-2">
                <p>8</p>
                <div className="h-[30px] w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {ipValues[7] || "Не определено"}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>9</p>
                <div className="h-[30px] w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {ipValues[8] || "Не определено"}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>10</p>
                <div className="h-[30px] w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {ipValues[9] || "Не определено"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>*от наиболее важной к наименее важной ценности</p>
    </div>
  );
};

export default Matches;
