const AboutCompany = ({ id }: { id: string }) => {
  return (
    <div id={id} className="flex flex-col gap-5 mt-32">
      <h1 className="text-3xl lg:text-4xl font-semibold">О компании</h1>
      <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-[#FF9800] font-semibold">Миссия</p>
          <p className="font-normal">
            Мы Помогаем пользователям сервиса Axiogram строить гармоничные
            взаимоотношения с людьми и увеличивать продуктивность совместных дел
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#FF9800] font-semibold">Как мы это делаем</p>
          <p className="font-normal">
            Мы точно и быстро рассчитываем результаты, бережно храним данные,
            популяризируем науку
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#FF9800] font-semibold">Зачем мы это делаем</p>
          <p className="font-normal">
            Мы зарабатываем для того, чтобы инвестировать в научные проекты,
            направленные на укрепление семейных и производственных отношений
            между людьми
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutCompany;
