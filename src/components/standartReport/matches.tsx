import Image from "next/image";

const Matches = ({
  values,
  matches,
}: {
  values: string[];
  matches: number;
}) => {
  return (
    <div className="flex flex-col gap-2 baseShadow rounded-3xl p-5 w-full hover:scale-105 transition-transform duration-300 ease-in-out">
      <h1 className="text-center font-semibold text-4xl">{matches}%</h1>
      <div className="flex justify-around">
        <div className="flex flex-col gap-2">
          <Image
            src={"/images/reports/step_06.png"}
            alt="report"
            width={300}
            height={300}
          />
          <div className="flex flex-col gap-3">
            <p className="text-center font-semibold text-2xl">Я считаю...</p>
            <div className="flex flex-col gap-1 w-[310px]">
              <div className="flex justify-between items-center gap-2">
                <p>1</p>
                <div className="text-[24px] h-[49px] w-full border shadow-lg rounded-[20px] border-primary flex items-center justify-start px-5 shake">
                  {values[0]}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>2</p>
                <div className="text-[24px] h-[49px] w-full border shadow-lg rounded-[20px] border-primary flex items-center justify-start px-5 shake">
                  {values[1]}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>3</p>
                <div className="text-[24px] h-[49px] w-full border shadow-lg rounded-[20px] border-primary flex items-center justify-start px-5 shake">
                  {values[2]}
                </div>
              </div>

              <div className="flex justify-between items-center gap-2">
                <p>4</p>
                <div className="text-[20px] h-10 w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {values[3]}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>5</p>
                <div className="text-[20px] h-10 w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {values[4]}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>6</p>
                <div className="text-[20px] h-10 w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {values[5]}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>7</p>
                <div className="text-[20px] h-10 w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {values[6]}
                </div>
              </div>

              <div className="flex justify-between items-center gap-2">
                <p>8</p>
                <div className="h-[30px] w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {values[7]}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>9</p>
                <div className="h-[30px] w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {values[8]}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>10</p>
                <div className="h-[30px] w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {values[9]}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Image
            src={"/images/reports/step_07.png"}
            alt="report"
            width={300}
            height={300}
          />
          <div className="flex flex-col gap-3">
            <p className="text-center font-semibold text-2xl">
              От меня ждут...
            </p>
            <div className="flex flex-col gap-1 w-[310px]">
              <div className="flex justify-between items-center gap-2">
                <p>1</p>
                <div className="text-[24px] h-[49px] w-full border shadow-lg rounded-[20px] border-primary flex items-center justify-start px-5 shake">
                  {values[10]}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>2</p>
                <div className="text-[24px] h-[49px] w-full border shadow-lg rounded-[20px] border-primary flex items-center justify-start px-5 shake">
                  {values[11]}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>3</p>
                <div className="text-[24px] h-[49px] w-full border shadow-lg rounded-[20px] border-primary flex items-center justify-start px-5 shake">
                  {values[12]}
                </div>
              </div>

              <div className="flex justify-between items-center gap-2">
                <p>4</p>
                <div className="text-[20px] h-10 w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {values[13]}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>5</p>
                <div className="text-[20px] h-10 w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {values[14]}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>6</p>
                <div className="text-[20px] h-10 w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {values[15]}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>7</p>
                <div className="text-[20px] h-10 w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {values[16]}
                </div>
              </div>

              <div className="flex justify-between items-center gap-2">
                <p>8</p>
                <div className="h-[30px] w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {values[17]}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>9</p>
                <div className="h-[30px] w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {values[18]}
                </div>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p>10</p>
                <div className="h-[30px] w-full border shadow-lg rounded-[20px] flex items-center justify-start px-5 shake">
                  {values[19]}
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
