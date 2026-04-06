import Card from "./card";
import { useGenderImage } from "@/hooks/useGenderImage";
import { GENDER_SPECIFIC_IMAGES } from "@/lib/imageUtils";

const getCards = (
  getImage: (key: keyof typeof GENDER_SPECIFIC_IMAGES) => string,
) => [
  {
    src: getImage("step_02"),
    title: "стать ещё эффективней",
    description: "и лучше контролировать ситуации",
  },
  {
    src: getImage("step_03"),
    title: "узнать подобие ценностей",
    description: "и создать или укрепить долгосрочные отношения.",
  },
  {
    src: getImage("step_04"),
    title: "свои ценности",
    description: "которые определяют ваши решения",
  },
  {
    src: getImage("step_05"),
    title: "насколько гармоничны ваши ценности между собой",
    description: "и какие ценности затрудняют выбор",
  },
  {
    src: getImage("step_06"),
    title: "подобие ваших ценностей с ценностями партнёра",
    description: "и рекомендации для продуктивного общения с ним",
  },
];

const CardsBlock = ({ id }: { id: string }) => {
  const { getImage } = useGenderImage();
  const cards = getCards(getImage);

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
