"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGenderImage } from "@/hooks/useGenderImage";
import {
  ScrollRevealItem,
  ScrollRevealStagger,
} from "@/components/motion/scroll-reveal";

const Tariffs = ({ id }: { id: string }) => {
  const router = useRouter();
  const { getImage } = useGenderImage();

  return (
    <ScrollRevealStagger
      id={id}
      className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-4 justify-start rounded-3xl baseShadow mt-12 lg:mt-20 p-4 sm:p-6 lg:p-10 lg:min-h-[560px]"
    >
      <ScrollRevealItem
        variant="fade-right"
        className="flex flex-col gap-4 w-full lg:w-1/2 justify-center items-center lg:items-start text-center lg:text-left"
      >
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
      </ScrollRevealItem>
      <ScrollRevealItem variant="fade-left" className="w-full min-w-0 lg:w-1/2">
        <Image
          src={getImage("step_07")}
          alt="tariffs"
          width={560}
          height={535}
          className="w-full h-auto max-w-[min(560px,100%)] mx-auto lg:mx-0"
        />
      </ScrollRevealItem>
    </ScrollRevealStagger>
  );
};

export default Tariffs;
