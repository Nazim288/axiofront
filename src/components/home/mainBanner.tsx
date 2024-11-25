import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MainBanner = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-5">
          <Image
            src={"/icons/mainBannerBadge.svg"}
            alt="mainBannerBadge"
            width={284}
            height={30}
            className="mb-5 shake"
          />
          <div className="line-height-1">
            <h1 className="text-5xl font-semibold text-primary">Познай себя</h1>
            <h1 className="text-5xl font-semibold">
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
          width={535}
          height={535}
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
