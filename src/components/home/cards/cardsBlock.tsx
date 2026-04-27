import Card from "./card";
import { useGenderImage } from "@/hooks/useGenderImage";
import { GENDER_SPECIFIC_IMAGES } from "@/lib/imageUtils";

const getCards = (
  getImage: (key: keyof typeof GENDER_SPECIFIC_IMAGES) => string,
) => [
  {
    src: getImage("step_02"),
    title: "стать ещё эффективней",
    description: "и повысить свою осознанность, когда принимаешь решения",
  },
  {
    src: getImage("step_03"),
    title: "узнать схожесть ценностей",
    description: "и создать или укрепить долгосрочные отношения",
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
    <div id={id} className="flex flex-col gap-10 lg:gap-16 mt-16 lg:mt-24">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl lg:text-4xl font-semibold">
          Опрос подойдет, когда вы хотите
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cards.slice(0, 2).map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl lg:text-4xl font-semibold">
          После опроса вы узнаете
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {cards.slice(2).map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsBlock;
