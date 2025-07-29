"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";
import MainBanner from "@/components/home/mainBanner";
import CardsBlock from "@/components/home/cards/cardsBlock";
// import TeamBlock from "@/components/home/team/teamBlock";
import AboutCompany from "@/components/home/aboutCompany";
import Contacts from "@/components/home/contacts";
import Tariffs from "@/components/home/tariffs";
import Faq from "@/components/home/faq";
import NewsBlock from "@/components/home/news/newsBlock";
import { useUser } from "@/contexts/UserContext";

function HomePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated } = useUser();
  const showAuth = searchParams.get("auth");

  useEffect(() => {
    if (showAuth === "signin") {
      // Если пользователь уже авторизован, очищаем URL от параметра auth
      if (isAuthenticated) {
        // Создаем новый URL без параметра auth
        const params = new URLSearchParams(searchParams.toString());
        params.delete("auth");
        const newUrl = params.toString() ? `/?${params.toString()}` : "/";
        router.replace(newUrl);
      } else {
        // Если не авторизован, показываем модальное окно входа
        document
          .querySelector<HTMLButtonElement>("[data-signin-trigger]")
          ?.click();
      }
    }
  }, [showAuth, isAuthenticated, router, searchParams]);

  // Отдельный useEffect для очистки URL при изменении состояния авторизации
  useEffect(() => {
    if (isAuthenticated && showAuth === "signin") {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("auth");
      const newUrl = params.toString() ? `/?${params.toString()}` : "/";
      router.replace(newUrl);
    }
  }, [isAuthenticated, showAuth, router, searchParams]);

  return (
    <>
      <MainBanner />
      <CardsBlock id="about" />
      {/* <TeamBlock id="team" /> */}
      <Tariffs id="tariffs" />
      <Faq id="faq" />
      <AboutCompany id="company" />
      <NewsBlock id="news" />
      <Contacts id="contacts" />
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
