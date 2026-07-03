"use client";

import Card from "./card";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const NEWS_MOCKS = [
  {
    date: "09.06.2026",
    title: "Знакомство",
    link: "https://vkvideo.ru/video-239162536_456239024",
  },
  {
    date: "09.06.2026",
    title: "О продукте Аксиограм",
    link: "https://vkvideo.ru/video-239162536_456239025",
  },
  {
    date: "09.06.2026",
    title: "Что такое ценности и зачем их измерять",
    link: "https://vkvideo.ru/video-239162536_456239026",
  },
  {
    date: "14.06.2026",
    title: "Уровни ценностей и что нужно понимать",
    link: "https://vkvideo.ru/video-239162536_456239028?list=33aa3735db3d3780be&t=1m29s",
  },
  {
    date: "27.06.2026",
    title: "Конфликт ценностей. Что с этим делать",
    link: "https://vkvideo.ru/video-239162536_456239040?list=d8470b458002efaeec",
  },
];

const NewsBlock = ({ id }: { id: string }) => {
  return (
    <div id={id} className="flex flex-col gap-6 mt-16 lg:mt-20">
      <ScrollReveal variant="fade-up">
        <p className="text-3xl font-semibold">Новости</p>
      </ScrollReveal>

      <ScrollReveal variant="scale-up" delay={0.08}>
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {NEWS_MOCKS.map((item, index) => (
              <CarouselItem
                key={index}
                className="p-5 md:basis-1/2 lg:basis-1/3"
              >
                <Card date={item.date} title={item.title} link={item.link} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="top-auto bottom-[-44px] left-1/2 -translate-x-[calc(100%+8px)] translate-y-0" />
          <CarouselNext className="top-auto bottom-[-44px] left-1/2 right-auto translate-x-[8px] translate-y-0" />
        </Carousel>
      </ScrollReveal>
    </div>
  );
};

export default NewsBlock;
