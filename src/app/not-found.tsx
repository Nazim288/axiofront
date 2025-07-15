import Image from "next/image";
import Link from "next/link";

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
      <Link href="/" className="text-xl font-normal text-primary underline">
        На главную
      </Link>
    </div>
  );
};

export default NotFoundPage;
