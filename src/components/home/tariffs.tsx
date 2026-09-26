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
      className="mt-12 flex flex-col-reverse justify-start gap-6 rounded-3xl baseShadow p-4 sm:p-6 lg:mt-20 lg:min-h-[560px] lg:flex-row lg:gap-4 lg:p-10"
    >
      <ScrollRevealItem
        variant="fade-right"
        className="flex w-full flex-col items-center justify-center gap-4 text-center lg:w-1/2 lg:items-start lg:text-left"
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
          className="mx-auto h-auto w-full max-w-[min(560px,100%)] lg:mx-0"
        />
      </ScrollRevealItem>
    </ScrollRevealStagger>
  );
};

export default Tariffs;
