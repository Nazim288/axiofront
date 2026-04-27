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
    <div id={id} className="flex flex-col gap-5 mt-16 lg:mt-24">
      <h1 className="text-3xl lg:text-4xl font-semibold">Консультации проводят </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default TeamBlock;
