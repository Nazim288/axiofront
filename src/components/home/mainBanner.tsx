"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGenderImage } from "@/hooks/useGenderImage";
import {
  HeroReveal,
  HeroRevealItem,
  HeroStagger,
} from "@/components/motion/scroll-reveal";

const MainBanner = () => {
  const { getImage } = useGenderImage();

  const checklist = [
    "Узнай свои ценности",
    "Сравни с ценностями партнера",
    "Улучшай стратегии общения",
  ];

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-10">
        <HeroStagger className="flex flex-col gap-5 flex-1">
          <HeroRevealItem variant="blur-up">
            <Image
              src={"/icons/mainBannerBadge.svg"}
              alt="mainBannerBadge"
              width={284}
              height={30}
              className="mb-5 shake w-full max-w-[284px] h-auto"
            />
          </HeroRevealItem>
          <HeroRevealItem variant="fade-up">
            <div className="line-height-1">
              <h1 className="text-3xl lg:text-5xl font-semibold text-primary">
                Познай себя
              </h1>
              <h1 className="text-3xl lg:text-5xl font-semibold">
                Найди гармонию <br /> в отношениях
              </h1>
            </div>
          </HeroRevealItem>
          <HeroStagger className="text-base sm:text-lg" stagger={0.08}>
            {checklist.map((text) => (
              <HeroRevealItem key={text} variant="fade-up">
                <div className="flex items-center gap-2 pb-4 hover:scale-105 transition-transform duration-300 ease-in-out">
                  <Image
                    src={"/icons/checkmark.svg"}
                    alt="checkmark"
                    width={40}
                    height={40}
                  />
                  {text}
                </div>
              </HeroRevealItem>
            ))}
          </HeroStagger>
        </HeroStagger>
        <HeroReveal variant="fade-left" delay={0.15} className="flex-shrink-0">
          <Image
            src={getImage("step_01")}
            alt="tariffs"
            width={400}
            height={400}
            className="w-full h-auto max-w-[min(400px,100%)] mx-auto lg:mx-0"
          />
        </HeroReveal>
      </div>
      <HeroReveal variant="scale-up" delay={0.35}>
        <Link href="/survey">
          <Button variant="default" size="cta" className="w-full mt-5">
            Заполнить опросник (10 минут)
          </Button>
        </Link>
      </HeroReveal>
    </div>
  );
};

export default MainBanner;
