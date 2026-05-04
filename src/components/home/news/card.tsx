import { Button } from "@/components/ui/button";

interface CardProps {
  date: string;
  title: string;
}

const Card = ({ date, title }: CardProps) => {
  return (
    <div className="flex h-full flex-col gap-2 rounded-3xl baseShadow p-5 sm:p-6 w-full">
      <p className="text-sm text-muted-foreground">{date}</p>
      <p className="text-lg sm:text-xl font-medium">{title}</p>
      <Button type="button" disabled variant="default" className="mt-auto">
        Посмотреть запись
      </Button>
    </div>
  );
};

export default Card;
