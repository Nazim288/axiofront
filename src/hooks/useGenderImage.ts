import { useUser } from "@/contexts/UserContext";
import { useGender } from "@/contexts/GenderContext";
import { getGenderImage, GENDER_SPECIFIC_IMAGES } from "@/lib/imageUtils";

/**
 * Хук для получения изображений с учетом пола пользователя
 * Использует гендер пользователя, если он авторизован, иначе использует выбранный гендер из контекста
 */
export const useGenderImage = () => {
  const { currentUser, isAuthenticated } = useUser();
  const { selectedGender } = useGender();

  // Приоритет: гендер пользователя (если авторизован) > выбранный гендер > undefined
  const userGender = isAuthenticated
    ? currentUser?.gender
    : selectedGender ?? undefined;

  /**
   * Получает изображение по ключу с учетом пола пользователя
   * @param imageKey - ключ изображения из GENDER_SPECIFIC_IMAGES
   * @returns путь к соответствующему изображению
   */
  const getImage = (imageKey: keyof typeof GENDER_SPECIFIC_IMAGES): string => {
    return getGenderImage(imageKey, userGender);
  };

  return {
    getImage,
    userGender,
    isMale: userGender === "MALE",
    isFemale: userGender === "FEMALE",
  };
};
