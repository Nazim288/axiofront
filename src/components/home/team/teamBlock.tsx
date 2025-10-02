import Card from "./card";

const cards = [
  {
    src: "/images/report.png", // Заменяем на доступное изображение
    title: "Галим, психолог",
  },
  {
    src: "/images/report.png",
    title: "Галим, психолог",
  },
  {
    src: "/images/report.png",
    title: "Галим, психолог",
  },
  {
    src: "/images/report.png",
    title: "Галим, психолог",
  },
  {
    src: "/images/report.png",
    title: "Галим, психолог",
  },
  {
    src: "/images/report.png",
    title: "Галим, психолог",
  },
];

const TeamBlock = ({ id }: { id: string }) => {
  return (
    <div id={id} className="flex flex-col gap-5 mt-32">
      <h1 className="text-4xl font-semibold">Консультации проводят </h1>
      <div className="flex gap-4 p-5 justify-center">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default TeamBlock;
