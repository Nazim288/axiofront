"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Tariffs = () => {
  const router = useRouter();
  return (
    <div className="flex gap-4 justify-start h-[600px] rounded-[20px] baseShadow mt-20 p-10">
      <div className="flex flex-col gap-4 w-[50%] justify-center">
        <p>
          В мире всё стремится к гармонии - ценности тоже. Вы узнаете больше о
          гармонии своих ценностей и ценностях партнёра, подписавшись на услуги
          сервиса.
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
        src={"/images/homePgae/values.png"}
        alt="tariffs"
        width={535}
        height={535}
      />
    </div>
  );
};

export default Tariffs;
