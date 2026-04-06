import Card from "./card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const NEWS_MOCKS = [
  {
    date: "11.02.2026",
    title: "Что такое ценности и зачем их измерять",
  },
  {
    date: "16.02.2026",
    title: "Уровни ценностей и что нужно понимать",
  },
  {
    date: "24.02.2026",
    title: "Конфликт ценностей - что делать",
  },
  {
    date: "2.03.2026",
    title: "Подобие ценностей: подробности",
  },
];

const NewsBlock = ({ id }: { id: string }) => {
  return (
    <div id={id} className="flex flex-col gap-6 mt-20">
      <p className="text-3xl font-semibold">Новости</p>

      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {NEWS_MOCKS.map((item, index) => (
            <CarouselItem key={index} className="p-5 md:basis-1/2 lg:basis-1/3">
              <Card date={item.date} title={item.title} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default NewsBlock;
