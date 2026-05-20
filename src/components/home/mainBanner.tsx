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
    <div className="w-full">
      <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10">
        <HeroStagger className="flex min-w-0 w-full flex-col gap-5">
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
            <div className="leading-tight">
              <h1 className="text-3xl lg:text-5xl font-semibold text-primary">
                Познай себя
              </h1>
              <h1 className="text-3xl lg:text-5xl font-semibold">
                Найди гармонию <br /> в отношениях
              </h1>
            </div>
          </HeroRevealItem>
          <HeroRevealItem variant="fade-up">
            <ul className="flex flex-col gap-1.5 sm:gap-2">
              {checklist.map((text) => (
                <li
                  key={text}
                  className="flex items-center gap-2 text-base sm:text-lg hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  <Image
                    src={"/icons/checkmark.svg"}
                    alt="checkmark"
                    width={40}
                    height={40}
                    className="shrink-0"
                  />
                  {text}
                </li>
              ))}
            </ul>
          </HeroRevealItem>
        </HeroStagger>
        <HeroReveal
          variant="fade-left"
          delay={0.15}
          className="w-full min-w-0 justify-self-center lg:max-w-[400px] lg:justify-self-end"
        >
          <Image
            src={getImage("step_01")}
            alt="tariffs"
            width={400}
            height={400}
            className="h-auto w-full max-w-[min(400px,100%)]"
          />
        </HeroReveal>
      </div>
      <HeroReveal variant="scale-up" delay={0.35} className="w-full">
        <Link href="/survey">
          <Button variant="default" size="cta" className="mt-5 w-full">
            Заполнить опросник (10 минут)
          </Button>
        </Link>
      </HeroReveal>
    </div>
  );
};

export default MainBanner;
