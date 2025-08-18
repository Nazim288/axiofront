import Card from "./card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const reviews = [
  {
    rating: 5,
    username: "Анна",
    reviewText:
      "Прекрасный сервис! Очень точные результаты и подробные отчеты. Рекомендую всем, кто хочет лучше понять себя.",
  },
  {
    rating: 4,
    username: "Дмитрий",
    reviewText:
      "Интересный и полезный тест. Помог разобраться в некоторых аспектах личности. Буду рекомендовать друзьям.",
  },
  {
    rating: 5,
    username: "Елена",
    reviewText:
      "Впечатляющий анализ! Многое из того, что написано в отчете, точно описывает мою личность и поведение.",
  },
  {
    rating: 4,
    username: "Максим",
    reviewText:
      "Хороший сервис для самопознания. Результаты помогли мне лучше понять свои сильные и слабые стороны.",
  },
  {
    rating: 5,
    username: "Ольга",
    reviewText:
      "Очень довольна результатом! Подробный анализ личности и полезные рекомендации для развития.",
  },
  {
    rating: 4,
    username: "Игорь",
    reviewText:
      "Качественный психологический анализ. Отчет оказался очень информативным и помог в понимании себя.",
  },
];

const ReviewsBlock = ({ id }: { id: string }) => {
  return (
    <div id={id} className="flex flex-col gap-6 mt-32">
      <h1 className="text-4xl font-semibold">Отзывы наших клиентов</h1>

      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {reviews.map((review, index) => (
            <CarouselItem key={index} className="p-5 md:basis-1/2 lg:basis-1/3">
              <Card {...review} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ReviewsBlock;
