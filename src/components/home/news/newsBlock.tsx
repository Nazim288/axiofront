import Card from "./card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const NewsBlock = () => {
  return (
    <div className="flex flex-col gap-6 mt-20">
      <p className="text-3xl font-semibold">Новости</p>

      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className="p-5 md:basis-1/2 lg:basis-1/3">
              <Card
                date="05.08.2024"
                title="Куда расти дальше или зачем знать свои ценности "
              />
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
