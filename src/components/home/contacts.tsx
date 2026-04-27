const Contacts = ({ id }: { id: string }) => {
  return (
    <div
      id={id}
      className="flex flex-col lg:flex-row justify-start gap-10 lg:gap-24 mt-16 lg:mt-24 mb-12 lg:mb-20"
    >
      <div>
        <h1 className="text-3xl lg:text-4xl font-semibold mb-4">
          Обратная связь
        </h1>
        <p className="font-semibold">
          Для записи на вебинар и иным предложениям или комментариям пишите нам
          на email: AG@Tarbastaev.ru
        </p>
      </div>
      <div>
        <h1 className="text-3xl lg:text-4xl font-semibold mb-4">Контакты</h1>
        <p>Адрес</p>
        <p>+7 (915) 293 — 52-37</p>
        <p>AG@Tarbastaev.ru</p>
      </div>
    </div>
  );
};

export default Contacts;
