# Система условного отображения изображений по полу

## Обзор

В проекте реализована система автоматического выбора изображений в зависимости от пола пользователя. Для мужчин отображаются изображения с префиксом "m" (например, `mstep_00.png`), для женщин - без префикса (например, `step_00.png`).

## Структура файлов

### Утилиты

- `src/lib/imageUtils.ts` - основные функции для работы с изображениями
- `src/hooks/useGenderImage.ts` - React хук для удобного использования

### Компоненты с поддержкой пола

- `src/components/home/mainBanner.tsx`
- `src/components/home/tariffs.tsx`
- `src/components/freeReport/reportTariffs.tsx`
- `src/components/standartReport/matches.tsx`
- `src/app/profile/page.tsx`

## Использование

### 1. Через хук useGenderImage (рекомендуется)

```tsx
import { useGenderImage } from "@/hooks/useGenderImage";

const MyComponent = () => {
  const { getImage, userGender, isMale, isFemale } = useGenderImage();

  return (
    <Image
      src={getImage("step_00")} // Автоматически выберет правильное изображение
      alt="description"
      width={400}
      height={300}
    />
  );
};
```

### 2. Через утилиты напрямую

```tsx
import { getGenderImage, getImageByGender } from "@/lib/imageUtils";
import { useUser } from "@/contexts/UserContext";

const MyComponent = () => {
  const { currentUser } = useUser();
  const userGender = currentUser?.gender;

  return (
    <Image
      src={getGenderImage("step_00", userGender)}
      alt="description"
      width={400}
      height={300}
    />
  );
};
```

## Доступные изображения

Все изображения с поддержкой пола определены в `GENDER_SPECIFIC_IMAGES`:

```typescript
{
  // Home page images
  "step_00": "/images/step_00.png",
  "step_01": "/images/step_01.png",
  "step_02": "/images/step_02.png",
  "step_03": "/images/step_03.png",
  "step_04": "/images/step_04.png",
  "step_05": "/images/step_05.png",
  "step_06": "/images/step_06.png",
  "step_07": "/images/step_07.png",
  "step_08": "/images/step_08.png",
  "step_09": "/images/step_09.png",
  "step_10": "/images/step_10.png",

  // Report images
  "report_step_06": "/images/step_06.png",
  "report_step_07": "/images/step_07.png",
}
```

## Правила именования файлов

### Стандартные изображения

- Женская версия: `step_00.png`
- Мужская версия: `mstep_00.png` (добавляется префикс "m")

Все изображения находятся в папке `public/images/` и имеют соответствующие мужские версии с префиксом "m".

## Добавление новых изображений

1. Добавьте изображения в папку `public/images/`
2. Обновите `GENDER_SPECIFIC_IMAGES` в `src/lib/imageUtils.ts`
3. При необходимости обновите функцию `getImageByGender` для специальных случаев

## Примеры

### Условный рендеринг по полу

```tsx
const { isMale, isFemale } = useGenderImage();

return (
  <div>
    {isMale && <p>Привет, мужчина!</p>}
    {isFemale && <p>Привет, женщина!</p>}
  </div>
);
```

### Получение пола пользователя

```tsx
const { userGender } = useGenderImage();

if (userGender === "MALE") {
  // Логика для мужчин
} else if (userGender === "FEMALE") {
  // Логика для женщин
}
```

## Fallback поведение

Если пол пользователя не определен (`undefined`), система возвращает женскую версию изображения по умолчанию.
