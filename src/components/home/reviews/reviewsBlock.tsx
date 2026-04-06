import Card from "./card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import { getReviews } from "@/api/review";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

interface Review {
  id: number;
  userId: number;
  userName: string;
  targetType: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

interface DisplayReview {
  id?: number;
  rating: number;
  username: string;
  reviewText: string;
}

const ReviewsBlock = ({ id }: { id: string }) => {
  const [apiReviews, setApiReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setIsLoading(true);
        const data = await getReviews("KV_86");
        setApiReviews(data);
      } catch (err) {
        console.error("Ошибка при загрузке отзывов:", err);
        setError("Не удалось загрузить отзывы");
        // Fallback к статичным отзывам при ошибке
        setApiReviews([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, []);

  // Нормализуем данные к единому формату
  const normalizeApiReviews = (apiData: Review[]): DisplayReview[] => {
    return apiData.map((review) => ({
      id: review.id,
      rating: review.rating,
      username: review.userName,
      reviewText: review.comment,
    }));
  };

  const displayReviews: DisplayReview[] =
    apiReviews.length > 0 ? normalizeApiReviews(apiReviews) : reviews;

  return (
    <div id={id} className="flex flex-col gap-6 mt-32">
      <h1 className="text-4xl font-semibold">Отзывы</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {displayReviews.map((review, index) => (
              <CarouselItem
                key={review.id || index}
                className="p-5 md:basis-1/2 lg:basis-1/3"
              >
                <Card
                  rating={review.rating}
                  username={review.username}
                  reviewText={review.reviewText}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
      <Link href="/survey">
        <Button
          variant="default"
          className="w-full mt-12 rounded-[40px] h-[60px] text-lg "
        >
          Заполнить опросник (10 минут)
        </Button>
      </Link>
    </div>
  );
};

export default ReviewsBlock;
