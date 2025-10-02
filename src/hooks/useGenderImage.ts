import { useUser } from "@/contexts/UserContext";
import { getGenderImage, GENDER_SPECIFIC_IMAGES } from "@/lib/imageUtils";

/**
 * Хук для получения изображений с учетом пола пользователя
 */
export const useGenderImage = () => {
  const { currentUser } = useUser();
  const userGender = currentUser?.gender;

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
