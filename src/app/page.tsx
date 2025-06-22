"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import MainBanner from "@/components/home/mainBanner";
import CardsBlock from "@/components/home/cards/cardsBlock";
// import TeamBlock from "@/components/home/team/teamBlock";
import AboutCompany from "@/components/home/aboutCompany";
import Contacts from "@/components/home/contacts";
import Tariffs from "@/components/home/tariffs";
import Faq from "@/components/home/faq";
import NewsBlock from "@/components/home/news/newsBlock";

export default function HomePage() {
  const searchParams = useSearchParams();
  const showAuth = searchParams.get("auth");

  useEffect(() => {
    if (showAuth === "signin") {
      // Здесь нужно добавить логику открытия модального окна
      // Можно использовать глобальное состояние или контекст для управления модальным окном
      document
        .querySelector<HTMLButtonElement>("[data-signin-trigger]")
        ?.click();
    }
  }, [showAuth]);

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
