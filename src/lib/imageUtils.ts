/**
 * Утилиты для работы с изображениями в зависимости от пола пользователя
 */

export type Gender = "MALE" | "FEMALE";

/**
 * Выбирает изображение в зависимости от пола пользователя
 * @param basePath - базовый путь к изображению (например, "/images/step_01.png")
 * @param gender - пол пользователя
 * @returns путь к соответствующему изображению
 */
export const getImageByGender = (basePath: string, gender?: Gender): string => {
  if (!gender) {
    // Если пол не определен, возвращаем женскую версию по умолчанию
    return basePath;
  }

  if (gender === "MALE") {
    // Для мужчин добавляем префикс "m" перед именем файла
    return basePath.replace(/([^/]+)\.(png|jpg|jpeg|gif|webp)$/, "m$1.$2");
  }

  // Для женщин возвращаем оригинальный путь
  return basePath;
};

/**
 * Список изображений, которые имеют мужские и женские версии
 */
export const GENDER_SPECIFIC_IMAGES = {
  // Home page images
  step_00: "/images/step_00.png",
  step_01: "/images/step_01.png",
  step_02: "/images/step_02.png",
  step_03: "/images/step_03.png",
  step_04: "/images/step_04.png",
  step_05: "/images/step_05.png",
  step_06: "/images/step_06.png",
  step_07: "/images/step_07.png",
  step_08: "/images/step_08.png",
  step_09: "/images/step_09.png",
  step_10: "/images/step_10.png",

  // Report images
  report_step_06: "/images/step_08.png",
  report_step_07: "/images/step_09.png",
} as const;

/**
 * Получает изображение по ключу с учетом пола
 * @param imageKey - ключ изображения из GENDER_SPECIFIC_IMAGES
 * @param gender - пол пользователя
 * @returns путь к соответствующему изображению
 */
export const getGenderImage = (
  imageKey: keyof typeof GENDER_SPECIFIC_IMAGES,
  gender?: Gender
): string => {
  const basePath = GENDER_SPECIFIC_IMAGES[imageKey];
  return getImageByGender(basePath, gender);
};
