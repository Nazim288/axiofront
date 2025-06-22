"use client";

import FreeReportCard from "@/components/freeReport/freeReportCard";
import ReportTariffs from "@/components/freeReport/reportTariffs";
import ColorPsychology from "@/components/standartReport/сolorPsychology";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { ProtectedRoute } from "@/components/protectedRoute/ProtectedRoute";

const data = {
  reports: [
    {
      title: "Гибкость",
      description:
        "Вам важно влиться в команду, соблюдать правила компании и быть её частью",
      color: "#FFD700",
    },
    {
      title: "Традиционность",
      description:
        "Вам важно принятие традиционных канонов общества для стабильной и спокойной жизни",
      color: "#FFaf00",
    },
    {
      title: "Сопереживание",
      description:
        "Вам важно оберегать и обеспечивать благополучие близких людей.",
      color: "#FF8000",
    },
    {
      title: "Толерантность",
      description:
        "Вам важно стремиться к пониманию людей ради безопасного общения с ними.",
      color: "#FF5500",
    },
    {
      title: "Самостоятельность",
      description: "Вам важно сохранять самостоятельность во всём.",
      color: "blue",
    },
    {
      title: "Энергичность",
      description: "Вам важно быть активным человеком.",
      color: "green",
    },
    {
      title: "Гедонизм",
      description:
        "Вам важно находить удовольствие во всём, чем бы не пришлось заниматься",
      color: "yellow",
    },
    {
      title: "Успешность",
      description:
        "Вам важно стремиться к достижению успеха и вызывать восторг у окружающих людей",
      color: "orange",
    },
    {
      title: "Власть",
      description: "Вам важно достижение лидерства и контроль над людьми",
      color: "green",
    },
    {
      title: "Защищённость",
      description: "Вам важно обеспечить безопасность себя и близких людей",
      color: "purple",
    },
  ],
  img: "/images/reports/report.png",
  date: "2024-01-01",
};

const FreeReportPage: FC = () => {
  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-10">
        <p className="text-md font-normal">{data.date}</p>
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
          {data.reports?.map((item) => (
            <FreeReportCard
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
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
            <Image src={data.img} alt="report" width={900} height={400} />
            <Button
              variant={"outline"}
              color="primary"
              className="w-full rounded-3xl"
            >
              Скачать
            </Button>
          </div>
        </div>
        <ReportTariffs />
      </div>
    </ProtectedRoute>
  );
};

export default FreeReportPage;
