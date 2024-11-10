import FreeReportCard from "@/components/freeReport/freeReportCard";
import ReportTariffs from "@/components/freeReport/reportTariffs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FC } from "react";

const paragraphs = [
  "Вы прекрасно потрудились, когда заполняли опросник! Пришло время разобраться в результатах.",
  "Сначала определимся в понятиях. Ценности — это убеждения, которые возникли в процессе жизненного опыта. Ценности определяют решения и поведение людей.",
  "Свои ценности нужно знать для:",
  "а) понимания того, как вы воспринимаете других людей, на что обратите внимание в первую очередь, а что можете не заметить при общении с другим человеком;",
  "б) совершения правильного выбора, когда вы учитываете те ценности, которые влияют на ваши спонтанные решения — выбор становится мудрым;",
  "в) спокойствия и уверенности в неизвестных ситуациях — зная свою систему ценностей, вы знаете, какую первую реакцию, скорее всего, выдаст ваш мозг, когда неизвестно, что будет дальше.",
  "Человечество давно изучает ценности, чтобы прогнозировать поведение людей. Учёные определили 10 основных ценностей, которые есть у всех цивилизованных людей. Решения определяют только три наиболее важные. Тройка этих ценностей — это убеждения о жизненных целях, которые вы стремитесь достичь и, чаще всего, ясно понимаете, ради чего.",
  "Итак, ваши ТОП-3 наиболее важных стремлений в жизни:",
];

const data = {
  reports: [
    {
      title: "Идентификативность",
      description: "Вам важно влиться в компанию.",
    },
    {
      title: "Идентификативность",
      description: "Вам важно влиться в компанию.",
    },
    {
      title: "Идентификативность",
      description: "Вам важно влиться в компанию.",
    },
  ],
  img: "/images/reports/report.png",
  date: "2024-01-01",
};

const FreeReportPage: FC = () => {
  return (
    <div className="flex flex-col gap-10">
      <p className="text-md font-normal">{data.date}</p>
      <h1 className="text-4xl font-bold">Мои ценности</h1>
      <div>
        {paragraphs.map((paragraph, index) => (
          <p key={index}>
            <br />
            {paragraph}
            <br />
          </p>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {data.reports?.map((item) => (
          <FreeReportCard
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
      <p>
        Представляете, у каждой ценности есть свой цвет! Есть даже наука —
        психология цвета. Мы сделали для вас комбинацию цветов из наиболее
        важных для вас ценностей.
      </p>
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
  );
};

export default FreeReportPage;
