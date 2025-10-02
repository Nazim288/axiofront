# Использование API пользователя

## Обзор

Реализована функциональность для получения и сохранения данных текущего пользователя в localStorage. При авторизации автоматически вызывается метод `http://localhost:3000/api/v1/person/current` и данные сохраняются в localStorage в поле `currentUser`.

## Структура данных

### PersonCurrentResponse

```typescript
interface PersonCurrentResponse {
  id: number;
  firstName: string;
  lastName: string | null;
  middleName: string | null;
  age: number;
  gender: "MALE" | "FEMALE";
  location: string;
  email: string;
  login: string;
  phoneNumber: string | null;
  birthDate: string;
  status: "ACTIVE" | "INACTIVE";
  reviews: Review[];
  emailVerified: boolean;
}

interface Review {
  id: number;
  userId: number | null;
  userName: string | null;
  targetType: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
```

## API методы

### getPersonCurrent()

Получает данные текущего пользователя с сервера и автоматически сохраняет их в localStorage.

```typescript
import { getPersonCurrent } from "@/api/auth";

const userData = await getPersonCurrent();
```

### getCurrentUserFromStorage()

Получает данные пользователя из localStorage.

```typescript
import { getCurrentUserFromStorage } from "@/api/auth";

const userData = getCurrentUserFromStorage();
```

### clearCurrentUserFromStorage()

Очищает данные пользователя из localStorage.

```typescript
import { clearCurrentUserFromStorage } from "@/api/auth";

clearCurrentUserFromStorage();
```

## React хуки

### useCurrentUser()

Хук для работы с данными пользователя в компонентах.

```typescript
import { useCurrentUser } from "@/hooks/useCurrentUser";

const MyComponent = () => {
  const { currentUser, isAuthenticated, isLoading } = useCurrentUser();

  if (isLoading) return <div>Загрузка...</div>;
  if (!isAuthenticated) return <div>Не авторизован</div>;
  if (!currentUser) return <div>Данные не найдены</div>;

  return <div>Привет, {currentUser.firstName}!</div>;
};
```

### useUser()

Базовый хук для работы с авторизацией.

```typescript
import { useUser } from "@/contexts/UserContext";

const MyComponent = () => {
  const { isAuthenticated, currentUser, login, logout, setCurrentUser } =
    useUser();

  // Использование...
};
```

## Автоматическая загрузка

Данные пользователя автоматически загружаются при:

1. Авторизации пользователя
2. Обновлении страницы (если есть токен)
3. Изменении данных в localStorage

## Примеры использования

### Отображение профиля пользователя

```typescript
import { UserProfile } from "@/components/UserProfile";

const ProfilePage = () => {
  return <UserProfile />;
};
```

### Получение данных пользователя в компоненте

```typescript
import { useCurrentUser } from "@/hooks/useCurrentUser";

const Header = () => {
  const { currentUser, isAuthenticated } = useCurrentUser();

  return (
    <header>
      {isAuthenticated && currentUser ? (
        <div>Добро пожаловать, {currentUser.firstName}!</div>
      ) : (
        <div>Войдите в систему</div>
      )}
    </header>
  );
};
```

### Проверка статуса пользователя

```typescript
import { useCurrentUser } from "@/hooks/useCurrentUser";

const AdminPanel = () => {
  const { currentUser } = useCurrentUser();

  if (currentUser?.status !== "ACTIVE") {
    return <div>Доступ запрещен</div>;
  }

  return <div>Панель администратора</div>;
};
```

## localStorage структура

Данные сохраняются в localStorage в следующем формате:

```json
{
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "currentUser": {
    "id": 3,
    "firstName": "Emeraldo",
    "lastName": null,
    "middleName": null,
    "age": 40,
    "gender": "MALE",
    "location": "Continent: null, Country: null, Region: null, City: null",
    "email": "gs_angelov@mail.ru",
    "login": "Emeraldo",
    "phoneNumber": null,
    "birthDate": "1985-01-01",
    "status": "ACTIVE",
    "reviews": [...],
    "emailVerified": false
  }
}
```

## Обработка ошибок

Все API методы включают обработку ошибок:

- При ошибке 401 токен и данные пользователя очищаются
- Ошибки логируются в консоль
- Компоненты получают состояние загрузки и ошибок

## Интеграция

Функциональность уже интегрирована в:

- `UserContext` - для глобального состояния
- `UserDataLoader` - для автоматической загрузки
- `layout.tsx` - для инициализации при загрузке приложения
