import { Button } from "@/components/ui/button";
import Image from "next/image";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <Image
        src={"/images/404.png"}
        alt="404"
        width={398}
        height={456}
        className="mb-5"
      />
      <p className="text-xl font-normal">Что-то пошло не так.</p>
      <Button variant="default" className="rounded-[40px] w-1/3">
        На главную
      </Button>
    </div>
  );
};

export default NotFoundPage;
