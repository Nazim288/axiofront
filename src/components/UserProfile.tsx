"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";

export const UserProfile = () => {
  const { currentUser, isAuthenticated, isLoading } = useCurrentUser();

  if (!isAuthenticated) {
    return <div>Пользователь не авторизован</div>;
  }

  if (isLoading) {
    return <div>Загрузка данных пользователя...</div>;
  }

  if (!currentUser) {
    return <div>Данные пользователя не найдены</div>;
  }

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Профиль пользователя</h2>
      <div className="space-y-2">
        <p>
          <strong>ID:</strong> {currentUser.id}
        </p>
        <p>
          <strong>Имя:</strong> {currentUser.firstName}
        </p>
        <p>
          <strong>Фамилия:</strong> {currentUser.lastName || "Не указана"}
        </p>
        <p>
          <strong>Отчество:</strong> {currentUser.middleName || "Не указано"}
        </p>
        <p>
          <strong>Возраст:</strong> {currentUser.age}
        </p>
        <p>
          <strong>Пол:</strong>{" "}
          {currentUser.gender === "MALE" ? "Мужской" : "Женский"}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <p>
          <strong>Логин:</strong> {currentUser.login}
        </p>
        <p>
          <strong>Телефон:</strong> {currentUser.phoneNumber || "Не указан"}
        </p>
        <p>
          <strong>Дата рождения:</strong> {currentUser.birthDate}
        </p>
        <p>
          <strong>Статус:</strong>{" "}
          {currentUser.status === "ACTIVE" ? "Активен" : "Неактивен"}
        </p>
        <p>
          <strong>Email подтвержден:</strong>{" "}
          {currentUser.emailVerified ? "Да" : "Нет"}
        </p>
        <p>
          <strong>Местоположение:</strong> {currentUser.location}
        </p>
        <div>
          <strong>Отзывы ({currentUser.reviews.length}):</strong>
          <ul className="ml-4 mt-2">
            {currentUser.reviews.map((review) => (
              <li key={review.id} className="mb-2 p-2 bg-gray-100 rounded">
                <p>
                  <strong>Рейтинг:</strong> {review.rating}/5
                </p>
                <p>
                  <strong>Комментарий:</strong> {review.comment}
                </p>
                <p>
                  <strong>Тип:</strong> {review.targetType}
                </p>
                <p>
                  <strong>Дата:</strong>{" "}
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
