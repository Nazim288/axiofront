import Image from "next/image";

interface CardProps {
  src: string;
  title: string;
  description: string;
}

const Card = ({ src, title, description }: CardProps) => {
  return (
    <div
      className={`flex flex-col baseShadow rounded-3xl p-5 w-full hover:scale-105 transition-transform duration-300 ease-in-out`}
    >
      <div className="flex justify-center items-center">
        <Image src={src} alt={title} width={358} height={358} />
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
