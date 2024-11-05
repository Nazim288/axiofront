import Image from "next/image";

interface CardProps {
  src: string;
  title: string;
}

const Card = ({ src, title }: CardProps) => {
  return (
    <div
      className={`flex flex-col baseShadow rounded-3xl w-fit hover:scale-105 transition-transform duration-300 ease-in-out`}
    >
      <div className="flex justify-center items-center">
        <Image
          className="rounded-t-3xl"
          src={src}
          alt={title}
          width={210}
          height={300}
        />
      </div>
      <div className="p-5">
        <p>{title}</p>
      </div>
    </div>
  );
};

export default Card;
