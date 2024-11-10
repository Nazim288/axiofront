import Card from "./card";

const cards = [
  {
    src: "/images/homePgae/changeYourLife.png",
    title: "изменить свою жизнь",
    description: "и найти в себе силы сделать это быстрее.",
  },
  {
    src: "/images/homePgae/partnerСompatibility.png",
    title: "узнать совместимость ценностей",
    description: "и укрепить долгосрочные отношения.",
  },
  {
    src: "/images/homePgae/values.png",
    title: "свои наиболее важные ценности",
    description: "которыми руководствуйтесь, когда делаете выбор.",
  },
  {
    src: "/images/homePgae/harmony.png",
    title: "насколько гармоничны ваши ценности между собой",
    description: "узнаете, какие противоречащие ценности затрудняют выбор.",
  },
  {
    src: "/images/homePgae/mainValues.png",
    title: "наиболее важные ценности партнёра",
    description: "для того чтобы «обходить острые углы» в общении.",
  },
];

const CardsBlock = ({ id }: { id: string }) => {
  return (
    <div id={id} className="flex flex-col gap-16 mt-32">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold">
          Опрос подойдет, когда вы хотите
        </h1>
        <div className="flex gap-6 p-5">
          {cards.slice(0, 2).map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold">После опроса вы узнаете</h1>
        <div className="flex gap-4">
          {cards.slice(2).map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsBlock;
