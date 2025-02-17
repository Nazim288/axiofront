const Contacts = ({ id }: { id: string }) => {
  return (
    <div
      id={id}
      className="flex flex-col lg:flex-row justify-start gap-10 lg:gap-40 mt-32 mb-20"
    >
      <div>
        <h1 className="text-3xl lg:text-4xl font-semibold mb-4">
          Техническая поддержка
        </h1>
        <p className="font-semibold">
          В случае возникновения проблемы работы с сайтом, напишите нам
        </p>
        <p>sovmestimost@gmail.com</p>
      </div>
      <div>
        <h1 className="text-3xl lg:text-4xl font-semibold mb-4">Контакты</h1>
        <p>Адрес</p>
        <p>+7 (123) 12-34-567</p>
        <p>sovmestimost@gmail.com</p>
      </div>
    </div>
  );
};

export default Contacts;
