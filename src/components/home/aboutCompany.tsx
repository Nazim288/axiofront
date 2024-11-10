const AboutCompany = ({ id }: { id: string }) => {
  return (
    <div id={id} className="flex flex-col gap-5 mt-32">
      <h1 className="text-4xl font-semibold">О компании</h1>
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-[#FF9800] font-semibold">Наша миссия</p>
          <p className="font-normal">
            Мы помогаем пользователям сервиса чувствовать свои взаимоотношения с
            людьми лучше, делать больше, жить счастливее.
          </p>
        </div>
        <div>
          <p className="text-[#FF9800] font-semibold">Как мы это делаем</p>
          <p className="font-normal">
            Мы уточняем представления пользователей сервиса о том, что является
            важным в их жизни и жизни окружающих людей.
          </p>
        </div>
        <div>
          <p className="text-[#FF9800] font-semibold">Зачем мы это делаем</p>
          <p className="font-normal">
            Мы инвестируем заработанные средства в научные проекты, направленные
            на укрепление счастливых семейных отношений.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutCompany;
