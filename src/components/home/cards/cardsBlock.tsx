import Card from "./card";

const cards = [
  {
    src: "/images/homePgae/changeYourLife.png",
    title: "стать ещё эффективней",
    description: "и найти в себе силы сделать это быстрее.",
  },
  {
    src: "/images/homePgae/partnerСompatibility.png",
    title: "узнать совместимость ценностей",
    description: "и создать или укрепить долгосрочные отношения.",
  },
  {
    src: "/images/homePgae/step_01.png",
    title: "свои ценности",
    description: "которые определяют ваши решения и действия.",
  },
  {
    src: "/images/homePgae/step_04.png",
    title: "насколько гармоничны ваши ценности между собой",
    description: "узнаете, какие ценности затрудняют выбор.",
  },
  {
    src: "/images/homePgae/step_05.png",
    title: "ценности партнёра",
    description: "для того чтобы «обходить острые углы» в общении.",
  },
];

const CardsBlock = ({ id }: { id: string }) => {
  return (
    <div id={id} className="flex flex-col gap-16 mt-32">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl lg:text-4xl font-semibold">
          Опрос подойдет, когда вы хотите
        </h1>
        <div className="flex flex-col lg:flex-row gap-6 p-5">
          {cards.slice(0, 2).map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl lg:text-4xl font-semibold">
          После опроса вы узнаете
        </h1>
        <div className="flex flex-col lg:flex-row gap-4">
          {cards.slice(2).map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsBlock;
