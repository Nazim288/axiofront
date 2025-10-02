"use client";

import FreeReportCard from "@/components/freeReport/freeReportCard";
import ReportTariffs from "@/components/freeReport/reportTariffs";
import ColorPsychology from "@/components/standartReport/сolorPsychology";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/protectedRoute/ProtectedRoute";
import { ITestResult } from "@/types/survey";
import { getYandexDiskFileUrl } from "@/api/yandexDisk";

// Статичные данные для fallback
const defaultData = {
  img: "/images/report.png",
  date: "2024-01-01",
};

const FreeReportPage: FC = () => {
  const [testResult, setTestResult] = useState<ITestResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  useEffect(() => {
    // Загружаем данные из localStorage
    const savedResult = localStorage.getItem("testResult");
    if (savedResult) {
      try {
        const parsedResult = JSON.parse(savedResult) as ITestResult;
        setTestResult(parsedResult);
      } catch (error) {
        console.error("Ошибка при парсинге результатов теста:", error);
      }
    }
    setIsLoading(false);
  }, []);

  // Загружаем URL изображения при изменении colorNumber
  useEffect(() => {
    if (testResult?.colorNumber) {
      setImageLoading(true);
      getYandexDiskFileUrl(testResult.colorNumber)
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => {
          console.error("Ошибка при получении URL изображения:", error);
          setImageUrl(null);
        })
        .finally(() => {
          setImageLoading(false);
        });
    }
  }, [testResult?.colorNumber]);

  // Формируем отчеты из реальных данных
  const getReportsFromTestResult = (
    result: ITestResult
  ): Array<{ title: string; description: string }> => {
    const valueTypes = [
      { key: "adaptability", title: "Гибкость" },
      { key: "traditions", title: "Традиционность" },
      { key: "compassion", title: "Сопереживание" },
      { key: "empathy", title: "Толерантность" },
      { key: "selfSufficiency", title: "Самостоятельность" },
      { key: "activity", title: "Энергичность" },
      { key: "hedonistic", title: "Гедонизм" },
      { key: "ambition", title: "Успешность" },
      { key: "power", title: "Власть" },
      { key: "security", title: "Защищённость" },
    ];

    return valueTypes
      .map((type) => {
        const value = result.ni?.[type.key as keyof typeof result.ni];
        if (
          typeof value === "object" &&
          value !== null &&
          "description" in value &&
          "rating" in value &&
          typeof value.rating === "number" &&
          typeof value.description === "string" &&
          value.description.trim() !== ""
        ) {
          return {
            title: type.title,
            description: value.description,
            rating: value.rating,
          };
        }
        return null;
      })
      .filter(
        (
          item
        ): item is { title: string; description: string; rating: number } =>
          item !== null
      )
      .sort((a, b) => a.rating - b.rating)
      .map((item) => ({ title: item.title, description: item.description })); // Убираем rating из финального результата
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </ProtectedRoute>
    );
  }

  const reports = testResult ? getReportsFromTestResult(testResult) : [];

  // Функция скачивания изображения
  const handleDownload = async () => {
    if (!testResult?.colorNumber) {
      console.error("colorNumber отсутствует");
      return;
    }

    setDownloadLoading(true);

    try {
      // Используем imageUrl если доступен, иначе дефолтное изображение
      const downloadUrl = imageUrl || defaultData.img;
      const response = await fetch(downloadUrl);
      const blob = await response.blob();

      // Создаем временную ссылку для скачивания
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `report-${testResult.colorNumber}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Ошибка при скачивании изображения:", error);
    } finally {
      setDownloadLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-10">
        <p className="text-md font-normal">
          {testResult?.date || defaultData.date}
        </p>
        <h1 className="text-4xl font-bold">Мои самые важные ценности</h1>
        <div className="flex flex-col gap-3">
          <p>Теперь давайте разберемся, что получилось.</p>
          <p>
            Ценности — это то, во что люди верят и что важно для них. Они
            формируются в течение всей жизни, начиная с детства, когда
            воспитывают родители, и заканчивая взрослыми годами, когда мы
            сталкиваемся с разными ситуациями и потерями. Ценности определяют
            решения и поведение людей.
          </p>
          <p>
            Учёные выделяют 10 основных ценностей для кого- то, какие- то
            ценности являются важными, а для кого-то нет. Краткие определения
            основных ценностей современных людей.
          </p>
          <p>
            <span className="font-bold">Гибкость</span> - когда важно влиться в
            команду, сообща и быть её частью
          </p>
          <p>
            <span className="font-bold">Традиционность</span> - когда важно
            принятие традиционных канонов
          </p>
          <p>
            <span className="font-bold">Сопереживание</span> - когда важно
            помогать и обеспечивать благополучие близким людям
          </p>
          <p>
            <span className="font-bold">Толерантность</span> - когда важно
            стремиться к пониманию людей и быть без опасного общения с ними
          </p>
          <p>
            <span className="font-bold">Самодостаточность</span> - когда важно
            сохранять самостоятельность во всем
          </p>
          <p>
            <span className="font-bold">Энергичность</span> - когда важно быть
            активным человеком
          </p>
          <p>
            <span className="font-bold">Гедонизм</span> - когда важно находить
            удовольствие во всём. Чем бы не пришлось заниматься
          </p>
          <p>
            <span className="font-bold">Успешность</span> — когда важно
            стремиться к достижению успеха и вызывать восторг у окружающих людей
          </p>
          <p>
            <span className="font-bold">Власть</span> — когда важно достижение
            лидерства и контроль над людьми
          </p>
          <p>
            <span className="font-bold">Защищённость</span> — когда важно
            обеспечить безопасность себя и близких людей
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-bold text-xl mb-4">
            В результате обработки ответов опросника, мы рассчитали наиболее
            важные ценности для Вас:
          </p>
          {reports.length > 0 ? (
            reports.map((item) => (
              <FreeReportCard
                key={item.title}
                title={item.title}
                description={item.description}
              />
            ))
          ) : (
            <p>
              Результаты теста не найдены. Пожалуйста, пройдите тест заново.
            </p>
          )}
        </div>
        <p>
          Понимание того, что для вас действительно важно, помогает лучше понять
          себя и окружающих. Это особенно важно для современной молодежи,
          которая стремится к долгосрочным и гармоничным отношениям и хочет
          достичь своих целей в жизни..
        </p>
        <p>
          <span className="font-bold">Как применить это знание</span> <br />
          Понаблюдайте за поступками близкого вам человека. Обратите внимание на
          те , которые соответствуют вашим ценностям, и на те , которые не
          попали в список ваших ценностных приоритетов. Сравните, каких
          поступков больше: тех , что соответствуют вашим ценностям, или тех ,
          что не так важны для вас . Это поможет понять, насколько ваши ценности
          схожи.
        </p>
        <p>
          Чем больше у вас общих ценностей, тем легче вам будет понимать друг
          друга в повседневной жизни и быть собой . Если же общих ценностей
          меньше , то стоит внимательнее следовать культурным нормам и заранее
          продумывать, что вы скажете при личной встрече.
        </p>
        <p>
          Мы поможем вам упростить процесс понимания, насколько ваши ценности
          совпадают с другими людьми. Для этого вы можете оформить подписку и
          попросить ближнее окружение пройти такой же опрос (подругу, другу,
          супруга, коллегу по работе ). Так вы быстрее увидите, насколько вы на
          одной волне.{" "}
          <Link href={"/tariffs"} className="text-primary underline">
            Оформить подписку
          </Link>
        </p>
        <ColorPsychology />
        <div className="w-full flex justify-center">
          <div className="flex flex-col gap-5 w-fit">
            {imageLoading ? (
              <div className="flex justify-center items-center w-[900px] h-[400px] bg-gray-100 rounded">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt="report"
                width={900}
                height={400}
                style={{ maxWidth: "100%", height: "auto" }}
                onError={(e) => {
                  console.error("Ошибка загрузки изображения:", imageUrl);
                  // Fallback на локальное изображение при ошибке
                  e.currentTarget.src = defaultData.img;
                }}
              />
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Image
                  src={defaultData.img}
                  alt="report"
                  width={900}
                  height={400}
                />
                {testResult?.colorNumber && (
                  <p className="text-sm text-gray-500">
                    Изображение для номера {testResult.colorNumber} недоступно.
                    Показано стандартное изображение.
                  </p>
                )}
              </div>
            )}
            <Button
              variant={"outline"}
              color="primary"
              className="w-full rounded-3xl"
              onClick={handleDownload}
              disabled={downloadLoading || imageLoading}
            >
              {downloadLoading ? "Скачивание..." : "Скачать"}
            </Button>
          </div>
        </div>
        <ReportTariffs />
      </div>
    </ProtectedRoute>
  );
};

export default FreeReportPage;
