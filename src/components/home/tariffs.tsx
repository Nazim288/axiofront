"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Tariffs = ({ id }: { id: string }) => {
  const router = useRouter();
  return (
    <div
      id={id}
      className="flex flex-col lg:flex-row gap-4 justify-start min-h-[600px] rounded-[20px] baseShadow mt-20 p-10"
    >
      <div className="flex flex-col gap-4 lg:w-[50%] justify-center">
        <p>
          Всё стремится к гармонии - ценности тоже. Вы узнаете о гармонии
          ценностей своих и партнёра, подписавшись на услуги сервиса
        </p>
        <Button
          variant="default"
          className="rounded-3xl"
          onClick={() => {
            router.push("/tariffs");
          }}
        >
          Выбрать тариф
        </Button>
      </div>
      <Image
        src={"/images/homePgae/step_01.png"}
        alt="tariffs"
        width={535}
        height={535}
        className="mx-auto lg:mx-0"
      />
    </div>
  );
};

export default Tariffs;
