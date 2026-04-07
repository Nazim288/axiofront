"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProtectedRoute } from "@/components/protectedRoute/ProtectedRoute";
import { getTestResult, getTestResultShort } from "@/api/survey";
import { getPersonCurrent, Review } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ITestResultShort } from "@/types/survey";
import { useGenderImage } from "@/hooks/useGenderImage";
import { PersonCurrentResponse } from "@/api/auth";
import { approveReview, blockReview, getReviews } from "@/api/review";
import Card from "@/components/home/reviews/card";
import { toast } from "sonner";

const Survey = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  const [shortResult, setShortResult] = useState<ITestResultShort | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [userLogin, setUserLogin] = useState<string>("");
  const [user, setUser] = useState<PersonCurrentResponse>();
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [apiReviews, setApiReviews] = useState<Review[]>([]);
  const [errorReviews, setErrorReviews] = useState<string>("");

  const { getImage } = useGenderImage();

  interface DisplayReview {
    id?: number;
    rating: number;
    username: string;
    reviewText: string;
  }

  const handleApproveReview = async (review: DisplayReview) => {
    if (!review.id) {
      toast.error("Невозможно одобрить отзыв: отсутствует reviewId");
      return;
    }

    try {
      await approveReview(review.id);
      setApiReviews((prev) => prev.filter((item) => item.id !== review.id));
      toast.success(`Отзыв от ${review.username} одобрен`);
    } catch (error) {
      console.error("Ошибка при одобрении отзыва:", error);
      toast.error("Не удалось одобрить отзыв");
    }
  };

  const handleRejectReview = async (review: DisplayReview) => {
    if (!review.id) {
      toast.error("Невозможно отклонить отзыв: отсутствует reviewId");
      return;
    }

    try {
      await blockReview(review.id);
      setApiReviews((prev) => prev.filter((item) => item.id !== review.id));
      toast.success(`Отзыв от ${review.username} отклонен`);
    } catch (error) {
      console.error("Ошибка при отклонении отзыва:", error);
      toast.error("Не удалось отклонить отзыв");
    }
  };

  // Статичные отзывы для fallback
  const staticReviews: DisplayReview[] = [
    {
      id: 1,
      rating: 5,
      username: "Анна",
      reviewText:
        "Прекрасный сервис! Очень точные результаты и подробные отчеты. Рекомендую всем, кто хочет лучше понять себя.",
    },
    {
      id: 2,
      rating: 4,
      username: "Дмитрий",
      reviewText:
        "Интересный и полезный тест. Помог разобраться в некоторых аспектах личности. Буду рекомендовать друзьям.",
    },
    {
      id: 3,
      rating: 5,
      username: "Елена",
      reviewText:
        "Впечатляющий анализ! Многое из того, что написано в отчете, точно описывает мою личность и поведение.",
    },
    {
      id: 4,
      rating: 4,
      username: "Максим",
      reviewText:
        "Хороший сервис для самопознания. Результаты помогли мне лучше понять свои сильные и слабые стороны.",
    },
    {
      id: 5,
      rating: 5,
      username: "Ольга",
      reviewText:
        "Очень довольна результатом! Подробный анализ личности и полезные рекомендации для развития.",
    },
    {
      id: 6,
      rating: 4,
      username: "Игорь",
      reviewText:
        "Качественный психологический анализ. Отчет оказался очень информативным и помог в понимании себя.",
    },
  ];

  // Нормализуем данные к единому формату
  const normalizeApiReviews = (apiData: Review[]): DisplayReview[] => {
    return apiData.map((review) => ({
      id: review.id,
      rating: review.rating,
      username: review.userName || "Анонимный пользователь",
      reviewText: review.comment,
    }));
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        // Загружаем данные пользователя
        const userResponse = await getPersonCurrent();
        setUserLogin(userResponse.login);
        setUser(userResponse);
      } catch (error) {
        console.error("Ошибка при загрузке данных пользователя:", error);
      } finally {
        setUserDataLoading(false);
      }
    };

    const loadShortResult = async () => {
      try {
        const response = await getTestResultShort();
        setShortResult(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке короткого результата:", error);
      } finally {
        setDataLoading(false);
      }
    };

    loadData();
    loadShortResult();
  }, []);

  const handleFreeReportClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!shortResult) {
      console.error("Данные короткого результата не загружены");
      return;
    }

    setIsLoading(true);

    try {
      const fullResponse = await getTestResult(shortResult.id.toString());
      localStorage.setItem("testResult", JSON.stringify(fullResponse.data));
      if (shortResult.paid === true) {
        router.push(`/standartReport/${shortResult.id}`);
      } else {
        router.push(`/freeReport/${shortResult.id}`);
      }
    } catch (error) {
      console.error("Ошибка при получении результатов теста:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setIsLoadingReviews(true);
        const data = await getReviews("KV_86", true);
        setApiReviews(data);
      } catch (err) {
        console.error("Ошибка при загрузке отзывов:", err);
        setErrorReviews("Не удалось загрузить отзывы");
        setApiReviews([]);
      } finally {
        setIsLoadingReviews(false);
      }
    };

    loadReviews();
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex flex-col">
        <div className="relative flex items-center gap-2">
          <h1 className="text-5xl font-bold">Профиль</h1>
          {userDataLoading ? (
            <p className="text-xl text-gray-400 mt-2">Загрузка...</p>
          ) : userLogin ? (
            <p className="text-xl text-gray-600 mt-2 font-bold">@{userLogin}</p>
          ) : (
            <p className="text-xl text-red-500 mt-2">Данные недоступны</p>
          )}
          {/* <Image
            src={"/icons/profileBadge.svg"}
            alt="profile badge"
            width={133}
            height={38}
            className="absolute -top-5 left-60"
          /> */}
        </div>

        <div className="flex flex-col gap-4 mt-20">
          <h2 className=" text-3xl font-semibold mb-5">Отчеты</h2>
          <div
            onClick={
              dataLoading || !shortResult ? undefined : handleFreeReportClick
            }
            className={`relative flex flex-col gap-2 baseShadow rounded-3xl p-5 w-full transition-transform duration-300 ease-in-out ${
              // Желтый бордер и фон только для непрочитанных отчетов
              shortResult && !shortResult.read
                ? "border border-yellow-500 bg-yellow-50"
                : "border border-gray-200 bg-white"
            } ${
              dataLoading || !shortResult
                ? "cursor-not-allowed opacity-50"
                : "hover:scale-105 cursor-pointer"
            }`}
          >
            <p className="text-xl font-semibold">Мои ценности</p>
            <p className="text-xl font-light">
              {shortResult?.paid ? "Полный" : "Краткий"}
            </p>
            {dataLoading ? (
              <div className="text-xl font-light text-gray-400">
                Загрузка...
              </div>
            ) : shortResult ? (
              <div className="flex flex-col gap-1">
                <p className="text-xl font-light">
                  {new Date(shortResult.finishTime).toLocaleDateString("ru-RU")}
                </p>
              </div>
            ) : (
              <p className="text-xl font-light text-red-500">
                Данные недоступны
              </p>
            )}
            {isLoading ? (
              <div className="absolute right-5 bottom-5 w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            ) : (
              <Image
                src={"/icons/profileArrow.svg"}
                alt="arrow right"
                width={24}
                height={24}
                className="absolute right-5 bottom-5"
              />
            )}
          </div>
        </div>

        <div className="flex justify-between gap-10 mt-16">
          <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-semibold">Новый вебинар</h1>
            <div className="w-full relative flex flex-col gap-2 baseShadow rounded-3xl p-5  h-fi hover:scale-105 transition-transform duration-300 ease-in-out">
              <p className="text-xl font-normal">05.07.24</p>
              <p className="text-xl font-semibold">
                Куда расти дальше или зачем <br />
                знать свои ценности{" "}
              </p>
              <Button variant="default" className="rounded-[40px] mt-5">
                Записаться на вебинар
              </Button>
            </div>
          </div>
          <div className="w-1/2 relative flex flex-col gap-2 justify-between baseShadow rounded-3xl p-5 hover:scale-105 transition-transform duration-300 ease-in-out">
            <p className="text-xl font-semibold">
              Отправь запрос на анализ <br /> совместимости и получи <br />
              результаты.
            </p>
            <Input
              type="email"
              placeholder="qwerty@gmail.com"
              className="h-12 bg-[#F3F1F1]"
            />
            <Button variant="default" className="rounded-[40px] mt-5">
              Отправить запрос
            </Button>
          </div>
        </div>

        {user?.roles?.includes("ROLE_ADMIN") && (
          <>
            <div className="mt-16">
              <h1 className="text-3xl font-semibold">Модерация отзывов</h1>
            </div>

            {isLoadingReviews ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            ) : errorReviews ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-red-500">{errorReviews}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {(apiReviews.length > 0
                  ? normalizeApiReviews(apiReviews)
                  : staticReviews
                ).map((review, index) => (
                  <Card
                    key={review.id || index}
                    rating={review.rating}
                    username={review.username}
                    reviewText={review.reviewText}
                    showModerationActions
                    onApprove={() => handleApproveReview(review)}
                    onReject={() => handleRejectReview(review)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        <div className="flex gap-4 justify-start h-[600px] rounded-[20px] baseShadow my-16  p-10">
          <div className="flex flex-col gap-4 w-[50%] justify-center">
            <p>
              Всё стремится к гармонии в этом мире, и ваши ценности тоже.
              Насколько совпадают ценности, которые вы считаете важными в жизни,
              и ценности, которые от вас ждут окружающие, как это влияет на
              взаимоотношения с людьми, вы можете узнать подписавшисьна услуги
              сервиса.
            </p>

            <Button variant="default" className="rounded-3xl" size="lg">
              Подробнее
            </Button>
          </div>
          <Image
            src={getImage("step_01")}
            alt="tariffs"
            width={535}
            height={535}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Survey;
