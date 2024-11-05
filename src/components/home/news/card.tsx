import { Button } from "@/components/ui/button";

interface CardProps {
  date: string;
  title: string;
}

const Card = ({ date, title }: CardProps) => {
  return (
    <div className="flex flex-col gap-1 rounded-3xl baseShadow p-5 w-full">
      <p>{date}</p>
      <p className="text-xl font-normal">{title}</p>
      <Button variant="default" className="rounded-3xl">
        Посмотреть запись
      </Button>
    </div>
  );
};

export default Card;
