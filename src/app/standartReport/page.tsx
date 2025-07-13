"use client";

import StandartReportCard from "@/components/freeReport/standartReportCard";
import Matches from "@/components/standartReport/matches";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Report from "@/components/report/report";
import { Input } from "@/components/ui/input";
import ColorPsychology from "@/components/standartReport/сolorPsychology";
import { ProtectedRoute } from "@/components/protectedRoute/ProtectedRoute";
import { ITestResult } from "@/types/survey";
import { useEffect, useState } from "react";
import { getYandexDiskFileUrl } from "@/api/yandexDisk";

const data = {
  reports: [
    [
      {
        title: "Идентификативность",
        description:
          "Важно выполнять правла и влиться в компанию, коллектив, общество. Важно поступать так, чтобы полностью соответствовать ожиданиям общества. Сдерживание своих побуждений, которые могут причинить вред окружающим – это одно из самых важных качеств человека. Дисциплина в выполнении правил, принятых в обществе – это самое важное качество современного человека.",
        priority: 1,
      },
      {
        title: "Идентификативность",
        description:
          "Важно выполнять правла и влиться в компанию, коллектив, общество. Важно поступать так, чтобы полностью соответствовать ожиданиям общества. Сдерживание своих побуждений, которые могут причинить вред окружающим – это одно из самых важных качеств человека. Дисциплина в выполнении правил, принятых в обществе – это самое важное качество современного человека.",
        priority: 1,
      },
      {
        title: "Идентификативность",
        description:
          "Важно выполнять правла и влиться в компанию, коллектив, общество. Важно поступать так, чтобы полностью соответствовать ожиданиям общества. Сдерживание своих побуждений, которые могут причинить вред окружающим – это одно из самых важных качеств человека. Дисциплина в выполнении правил, принятых в обществе – это самое важное качество современного человека.",
        priority: 1,
      },
      {
        title: "Идентификативность",
        description:
          "Важно выполнять правла и влиться в компанию, коллектив, общество. Важно поступать так, чтобы полностью соответствовать ожиданиям общества. Сдерживание своих побуждений, которые могут причинить вред окружающим – это одно из самых важных качеств человека. Дисциплина в выполнении правил, принятых в обществе – это самое важное качество современного человека.",
        priority: 2,
      },
      {
        title: "Идентификативность",
        description:
          "Важно выполнять правла и влиться в компанию, коллектив, общество. Важно поступать так, чтобы полностью соответствовать ожиданиям общества. Сдерживание своих побуждений, которые могут причинить вред окружающим – это одно из самых важных качеств человека. Дисциплина в выполнении правил, принятых в обществе – это самое важное качество современного человека.",
        priority: 2,
      },
      {
        title: "Идентификативность",
        description:
          "Важно выполнять правла и влиться в компанию, коллектив, общество. Важно поступать так, чтобы полностью соответствовать ожиданиям общества. Сдерживание своих побуждений, которые могут причинить вред окружающим – это одно из самых важных качеств человека. Дисциплина в выполнении правил, принятых в обществе – это самое важное качество современного человека.",
        priority: 2,
      },
      {
        title: "Идентификативность",
        description:
          "Важно выполнять правла и влиться в компанию, коллектив, общество. Важно поступать так, чтобы полностью соответствовать ожиданиям общества. Сдерживание своих побуждений, которые могут причинить вред окружающим – это одно из самых важных качеств человека. Дисциплина в выполнении правил, принятых в обществе – это самое важное качество современного человека.",
        priority: 3,
      },
      {
        title: "Идентификативность",
        description:
          "Важно выполнять правла и влиться в компанию, коллектив, общество. Важно поступать так, чтобы полностью соответствовать ожиданиям общества. Сдерживание своих побуждений, которые могут причинить вред окружающим – это одно из самых важных качеств человека. Дисциплина в выполнении правил, принятых в обществе – это самое важное качество современного человека.",
        priority: 3,
      },
      {
        title: "Идентификативность",
        description:
          "Важно выполнять правла и влиться в компанию, коллектив, общество. Важно поступать так, чтобы полностью соответствовать ожиданиям общества. Сдерживание своих побуждений, которые могут причинить вред окружающим – это одно из самых важных качеств человека. Дисциплина в выполнении правил, принятых в обществе – это самое важное качество современного человека.",
        priority: 3,
      },
    ],
    [
      {
        title: "Идентификативность",
        description:
          "Важно выполнять правла и влиться в компанию, коллектив, общество. Важно поступать так, чтобы полностью соответствовать ожиданиям общества. Сдерживание своих побуждений, которые могут причинить вред окружающим – это одно из самых важных качеств человека. Дисциплина в выполнении правил, принятых в обществе – это самое важное качество современного человека.",
        priority: 1,
      },
      {
        title: "Идентификативность",
        description:
          "Важно выполнять правла и влиться в компанию, коллектив, общество. Важно поступать так, чтобы полностью соответствовать ожиданиям общества. Сдерживание своих побуждений, которые могут причинить вред окружающим – это одно из самых важных качеств человека. Дисциплина в выполнении правил, принятых в обществе – это самое важное качество современного человека.",
        priority: 1,
      },
      {
        title: "Идентификативность",
        description:
          "Важно выполнять правла и влиться в компанию, коллектив, общество. Важно поступать так, чтобы полностью соответствовать ожиданиям общества. Сдерживание своих побуждений, которые могут причинить вред окружающим – это одно из самых важных качеств человека. Дисциплина в выполнении правил, принятых в обществе – это самое важное качество современного человека.",
        priority: 1,
      },
      {
        title: "Идентификативность",
        description:
          "Важно выполнять правла и влиться в компанию, коллектив, общество. Важно поступать так, чтобы полностью соответствовать ожиданиям общества. Сдерживание своих побуждений, которые могут причинить вред окружающим – это одно из самых важных качеств человека. Дисциплина в выполнении правил, принятых в обществе – это самое важное качество современного человека.",
        priority: 2,
      },
      {
        title: "Идентификативность",
        description:
          "Важно выполнять правла и влиться в компанию, коллектив, общество. Важно поступать так, чтобы полностью соответствовать ожиданиям общества. Сдерживание своих побуждений, которые могут причинить вред окружающим – это одно из самых важных качеств человека. Дисциплина в выполнении правил, принятых в обществе – это самое важное качество современного человека.",
        priority: 2,
      },
      {
        title: "Идентификативность",
        description:
          "Важно выполнять правла и влиться в компанию, коллектив, общество. Важно поступать так, чтобы полностью соответствовать ожиданиям общества. Сдерживание своих побуждений, которые могут причинить вред окружающим – это одно из самых важных качеств человека. Дисциплина в выполнении правил, принятых в обществе – это самое важное качество современного человека.",
        priority: 2,
      },
      {
        title: "Идентификативность",
        description:
          "Важно выполнять правла и влиться в компанию, коллектив, общество. Важно поступать так, чтобы полностью соответствовать ожиданиям общества. Сдерживание своих побуждений, которые могут причинить вред окружающим – это одно из самых важных качеств человека. Дисциплина в выполнении правил, принятых в обществе – это самое важное качество современного человека.",
        priority: 3,
      },
      {
        title: "Идентификативность",
        description:
          "Важно выполнять правла и влиться в компанию, коллектив, общество. Важно поступать так, чтобы полностью соответствовать ожиданиям общества. Сдерживание своих побуждений, которые могут причинить вред окружающим – это одно из самых важных качеств человека. Дисциплина в выполнении правил, принятых в обществе – это самое важное качество современного человека.",
        priority: 3,
      },
      {
        title: "Идентификативность",
        description:
          "Важно выполнять правла и влиться в компанию, коллектив, общество. Важно поступать так, чтобы полностью соответствовать ожиданиям общества. Сдерживание своих побуждений, которые могут причинить вред окружающим – это одно из самых важных качеств человека. Дисциплина в выполнении правил, принятых в обществе – это самое важное качество современного человека.",
        priority: 3,
      },
    ],
  ],
  img: "/images/reports/report.png",
  date: "2024-01-01",
};

const formSchema = z.object({
  email: z.string().email({ message: "Неверный формат почты" }),
});

const StandartReportPage = () => {
  const [testResult, setTestResult] = useState<ITestResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  // Формируем отчеты из реальных данных ni
  const getNiReports = (result: ITestResult) => {
    if (!result.ni) return [];

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
        const value = result.ni![type.key as keyof typeof result.ni];
        if (
          typeof value === "object" &&
          value !== null &&
          "description" in value &&
          "rating" in value &&
          typeof value.rating === "number" &&
          typeof value.description === "string"
        ) {
          return {
            title: type.title,
            description: value.description,
            rating: value.rating,
            priority: Math.ceil(value.rating / 4), // Конвертируем rating в priority (1-3)
          };
        }
        return null;
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => b.rating - a.rating);
  };

  // Формируем отчеты из реальных данных ip
  const getIpReports = (result: ITestResult) => {
    if (!result.ip) return [];

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
        const value = result.ip![type.key as keyof typeof result.ip];
        if (
          typeof value === "object" &&
          value !== null &&
          "description" in value &&
          "rating" in value &&
          typeof value.rating === "number" &&
          typeof value.description === "string"
        ) {
          return {
            title: type.title,
            description: value.description,
            rating: value.rating,
            priority: Math.ceil(value.rating / 4), // Конвертируем rating в priority (1-3)
          };
        }
        return null;
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => b.rating - a.rating);
  };

  // Формируем массивы названий для компонента Matches
  const getMatchesValues = (result: ITestResult) => {
    const niReports = getNiReports(result);
    const ipReports = getIpReports(result);

    const niValues = niReports.map((item) => item.title);
    const ipValues = ipReports.map((item) => item.title);

    // Дополняем до 10 элементов если нужно
    while (niValues.length < 10) niValues.push("Не определено");
    while (ipValues.length < 10) ipValues.push("Не определено");

    return [...niValues.slice(0, 10), ...ipValues.slice(0, 10)];
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

  const niReports = testResult ? getNiReports(testResult) : [];
  const ipReports = testResult ? getIpReports(testResult) : [];
  const matchesValues = testResult ? getMatchesValues(testResult) : [];

  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-10">
        <p className="text-md font-normal">{testResult?.date || data.date}</p>
        <Report />
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-semibold">
            Вы так думаете (я считаю что..)
          </p>
          <div className="flex flex-col gap-5">
            {niReports.length > 0 ? (
              niReports.map((item, index) => (
                <StandartReportCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  number={index + 1}
                  priority={item.priority}
                />
              ))
            ) : (
              <p>Данные отчета не найдены</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-semibold">
            Вы так делаете (ближнее окружение, по вашему мнению, ожидает от вас
            дел, связанных…)
          </p>
          <div className="flex flex-col gap-5">
            {ipReports.length > 0 ? (
              ipReports.map((item, index) => (
                <StandartReportCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  number={index + 1}
                  priority={item.priority}
                />
              ))
            ) : (
              <p>Данные отчета не найдены</p>
            )}
          </div>
        </div>
        <p>
          Иногда в жизни случается так, что поведение, которого от вас (по
          вашему мнению) ждут окружающие, не всегда соответствует вашим
          собственным ценностям.
          <br />
          <br />
          Это может произойти потому, что ваши приоритеты могли измениться, и
          теперь какие-то ценности для вас стали важнее, чем раньше. Или вы
          начали иначе понимать, какое поведение, основанное на ценностях,
          ожидают от вас окружающие люди.
          <br />
          <br />
          Иными словами, иногда ваши представления о том, что должно быть важным
          в вашей жизни, и ваши представления о том что должно быть важным в
          жизни окружающих вас людей, не совпадают.
          <br />
          <br />
          Таким образом, естественно возникает вопрос – а насколько согласованы
          между собой ваши ценности по уровням: «Вы так думаете» и «Вы так
          делаете». Другими словами – насколько совпадают ваши представления о
          собственных ценностях и ваши представления о восприятии ваших
          ценностей окружающими людьми.
          <br />
          <br />
          Величина этой согласованности находится в интервале от 0 до 100%.
        </p>
        <Matches matches={testResult?.pcs || 0} values={matchesValues} />
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 baseShadow rounded-3xl p-5 w-full hover:scale-105 transition-transform duration-300 ease-in-out">
            <p className="text-2xl font-semibold text-[#388E3C]">
              Привычные модели поведения, когда ничего не понятно
            </p>
            <p>
              Стремиться полностью соответствовать ожиданиям общества – это
              «путь в никуда», общество слишком разное, угодить всем не
              получится. Сдерживание своих побуждений, которые могут причинить
              вред окружающим –необходимо, но иногда то, что считается вредным в
              текущий момент, со временем оказывается пользой. Дисциплина в
              выполнении правил, принятых в обществе – недостижима.
            </p>
          </div>
          <div className="flex flex-col gap-2 baseShadow rounded-3xl p-5 w-full hover:scale-105 transition-transform duration-300 ease-in-out">
            <p className="text-2xl font-semibold text-[#FF9800]">
              5 советов, как наладить эффективное общение в условиях
              неопределенности
            </p>
            <p>
              Стремиться полностью соответствовать ожиданиям общества – это
              «путь в никуда», общество слишком разное, угодить всем не
              получится. Сдерживание своих побуждений, которые могут причинить
              вред окружающим –необходимо, но иногда то, что считается вредным в
              текущий момент, со временем оказывается пользой. Дисциплина в
              выполнении правил, принятых в обществе – недостижима, т.к. слишком
              часто меняются правила. Стремиться полностью соответствовать
              ожиданиям общества – это «путь в никуда», общество слишком разное,
              угодить всем не получится. Сдерживание своих побуждений, которые
              могут причинить вред окружающим –необходимо, но иногда то, что
              считается вредным в текущий момент, со временем оказывается
              пользой. Дисциплина в выполнении правил, принятых в обществе –
              недостижима, т.к. слишком часто меняются правила.
            </p>
          </div>
        </div>
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
                  e.currentTarget.src = data.img;
                }}
              />
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Image src={data.img} alt="report" width={900} height={400} />
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
            >
              Выслать на эл.почту текущую версию отчета и картинку
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 baseShadow rounded-3xl p-5 w-full hover:scale-105 transition-transform duration-300 ease-in-out">
          <p className="text-2xl font-normal">
            Хотите получить более точные советы о том, как лучше общаться с
            определённым человеком? Просто отправьте ему письмо с просьбой
            заполнить опросник. После того как он это сделает, мы рассчитаем
            совместимость ценностей и отправим результаты вам.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="email@example.com"
                        className="pr-10 h-12 bg-[#F3F1F1]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant={"default"}
                color="primary"
                className="w-full rounded-3xl text-lg font-md h-[60px]"
              >
                Отправить заявку
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default StandartReportPage;
