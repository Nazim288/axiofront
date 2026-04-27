import Image from "next/image";

interface CardProps {
  src: string;
  title: string;
}

const Card = ({ src, title }: CardProps) => {
  return (
    <div className="flex h-full flex-col baseShadow rounded-3xl w-full hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="flex justify-center items-center">
        <Image
          className="rounded-t-3xl w-full h-auto object-cover aspect-[3/4]"
          src={src}
          alt={title}
          width={210}
          height={300}
        />
      </div>
      <div className="p-5 sm:p-6">
        <p className="font-medium">{title}</p>
      </div>
    </div>
  );
};

export default Card;
