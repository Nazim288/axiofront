import Image from "next/image";

interface CardProps {
  src: string;
  title: string;
  description: string;
}

const Card = ({ src, title, description }: CardProps) => {
  return (
    <div className="flex h-full flex-col baseShadow rounded-3xl p-5 sm:p-6 w-full hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="flex justify-center items-center">
        <Image src={src} alt={title} width={358} height={358} className="w-full h-auto max-w-[358px]" />
      </div>
      <div className="mt-2">
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Card;
