import MainBanner from "@/components/home/mainBanner";
import CardsBlock from "@/components/home/cards/cardsBlock";
import TeamBlock from "@/components/home/team/teamBlock";
import AboutCompany from "@/components/home/aboutCompany";
import Contacts from "@/components/home/contacts";
import Tariffs from "@/components/home/tariffs";
import Faq from "@/components/home/faq";
import NewsBlock from "@/components/home/news/newsBlock";

export default function Home() {
  return (
    <>
      <MainBanner />
      <CardsBlock id="about" />
      <TeamBlock id="team" />
      <Tariffs id="tariffs" />
      <Faq id="faq" />
      <AboutCompany id="company" />
      <NewsBlock id="news" />
      <Contacts id="contacts" />
    </>
  );
}
