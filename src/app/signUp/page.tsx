"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Survey = () => {
  return (
    <div className="flex flex-col">
      <div className="relative">
        <h1 className="text-5xl font-bold">Профиль</h1>
        <Image
          src={"/icons/profileBadge.svg"}
          alt="profile badge"
          width={133}
          height={38}
          className="absolute -top-5 left-60"
        />
      </div>

      <div className="flex flex-col gap-4 mt-20">
        <h2 className=" text-3xl font-semibold mb-5">Отчеты</h2>
        <div className="relative flex flex-col gap-2 baseShadow rounded-3xl p-5 w-full h-fi hover:scale-105 transition-transform duration-300 ease-in-out">
          <p className="text-xl font-semibold">Мои ценности</p>
          <p className="text-xl font-light">Краткий</p>
          <p className="text-xl font-light">05.07.24</p>
          <Image
            src={"/icons/profileArrow.svg"}
            alt="arrow right"
            width={24}
            height={24}
            className="absolute right-5 bottom-5"
          />
        </div>
        <div className="relative flex flex-col gap-2 baseShadow rounded-3xl p-5 w-full h-fi hover:scale-105 transition-transform duration-300 ease-in-out">
          <p className="text-xl font-semibold">Мои ценности</p>
          <p className="text-xl font-light">Краткий</p>
          <p className="text-xl font-light">05.07.24</p>
          <Image
            src={"/icons/profileArrow.svg"}
            alt="arrow right"
            width={24}
            height={24}
            className="absolute right-5 bottom-5"
          />
        </div>
      </div>

      <div className="flex justify-between gap-10 mt-36">
        <div className="flex flex-col gap-8">
          <h1 className="text-3xl font-semibold">Новый вебинар</h1>
          <div className="w-full relative flex flex-col gap-2 baseShadow rounded-3xl p-5  h-fi hover:scale-105 transition-transform duration-300 ease-in-out">
            <p className="text-xl font-normal">05.07.24</p>
            <p className="text-xl font-semibold">
              Куда расти дальше или зачем <br />
              знать свои ценности{" "}
            </p>
            <Button variant="default" className="rounded-[40px] mt-5">
              Записаться на вебинар
            </Button>
          </div>
        </div>
        <div className="w-1/2 relative flex flex-col gap-2 justify-between baseShadow rounded-3xl p-5 hover:scale-105 transition-transform duration-300 ease-in-out">
          <p className="text-xl font-semibold">
            Отправь запрос на анализ <br /> совместимости и получи <br />
            результаты.
          </p>
          <Input type="email" placeholder="qwerty@gmail.com" className="h-10" />
          <Button variant="default" className="rounded-[40px] mt-5">
            Отправить запрос
          </Button>
        </div>
      </div>

      <div className="flex gap-4 justify-start h-[600px] rounded-[20px] baseShadow my-24  p-10">
        <div className="flex flex-col gap-4 w-[50%] justify-center">
          <p>
            Всё стремится к гармонии в этом мире, и ваши ценности тоже.
            Насколько совпадают ценности, которые вы считаете важными в жизни, и
            ценности, которые от вас ждут окружающие, как это влияет на
            взаимоотношения с людьми, вы можете узнать подписавшисьна услуги
            сервиса.
          </p>

          <Button variant="default" className="rounded-3xl" size="lg">
            Подробнее
          </Button>
        </div>
        <Image
          src={"/images/homePgae/values.png"}
          alt="tariffs"
          width={535}
          height={535}
        />
      </div>
    </div>
  );
};

export default Survey;
