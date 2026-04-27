"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGenderImage } from "@/hooks/useGenderImage";
const Tariffs = ({ id }: { id: string }) => {
  const router = useRouter();
  const { getImage } = useGenderImage();

  return (
    <div
      id={id}
      className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-4 justify-start rounded-3xl baseShadow mt-12 lg:mt-20 p-4 sm:p-6 lg:p-10 lg:min-h-[560px]"
    >
      <div className="flex flex-col gap-4 w-full lg:w-1/2 justify-center items-center lg:items-start text-center lg:text-left">
        <p className="text-lg sm:text-xl lg:text-2xl">
          Получи анализ результатов опроса
        </p>
        <Button
          variant="default"
          size="cta"
          className="w-full sm:w-auto"
          onClick={() => {
            router.push("/tariffs");
          }}
        >
          Выбрать тариф
        </Button>
      </div>
      <div className="w-full lg:w-1/2">
        <Image
          src={getImage("step_07")}
          alt="tariffs"
          width={560}
          height={535}
          className="w-full h-auto max-w-[560px] mx-auto lg:mx-0"
        />
      </div>
    </div>
  );
};

export default Tariffs;
