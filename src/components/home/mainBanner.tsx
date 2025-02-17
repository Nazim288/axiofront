import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MainBanner = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        <div className="flex flex-col gap-5">
          <Image
            src={"/icons/mainBannerBadge.svg"}
            alt="mainBannerBadge"
            width={284}
            height={30}
            className="mb-5 shake"
          />
          <div className="line-height-1">
            <h1 className="text-3xl lg:text-5xl font-semibold text-primary">
              Познай себя
            </h1>
            <h1 className="text-3xl lg:text-5xl font-semibold">
              Найди гармонию <br /> в отношениях
            </h1>
          </div>
          <ul>
            <li className="pb-4">
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 ease-in-out">
                <Image
                  src={"/icons/checkmark.svg"}
                  alt="checkmark"
                  width={40}
                  height={40}
                />
                Узнай свои ценности
              </div>
            </li>
            <li className="pb-4">
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 ease-in-out">
                <Image
                  src={"/icons/checkmark.svg"}
                  alt="checkmark"
                  width={40}
                  height={40}
                />
                Сравни с ценностями партнера
              </div>
            </li>
            <li className="pb-4">
              <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300 ease-in-out">
                <Image
                  src={"/icons/checkmark.svg"}
                  alt="checkmark"
                  width={40}
                  height={40}
                />
                Улучши стратегию общения
              </div>
            </li>
          </ul>
        </div>
        <Image
          src={"/images/homePgae/values.png"}
          alt="tariffs"
          width={358}
          height={358}
          className="mx-auto lg:mx-0"
        />
      </div>
      <Link href="/survey">
        <Button
          variant="default"
          className="w-full mt-5 rounded-[40px] h-[60px] text-lg"
        >
          Пройти опрос
        </Button>
      </Link>
    </div>
  );
};

export default MainBanner;
