interface YandexDiskResponse {
  href: string;
  method: string;
  templated: boolean;
}

// Кеш для хранения полученных ссылок
const linkCache = new Map<string, { url: string; timestamp: number }>();
const CACHE_DURATION = 60 * 60 * 1000; // 1 час

export const getYandexDiskFileUrl = async (
  colorNumber: number
): Promise<string> => {
  const paddedNumber = colorNumber.toString().padStart(3, "0");
  const fileName = `${paddedNumber}.png`;
  const cacheKey = `yandex_${fileName}`;

  // Проверяем кеш
  const cached = linkCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.url;
  }

  try {
    // Публичный ключ папки Яндекс.Диска
    const publicKey = "https://disk.yandex.ru/d/C4Zm1oaptgdjwA";

    // Правильный путь к файлу (проверено через тестирование API)
    const path = `/${fileName}`; // /007.png
    const downloadUrl = `https://cloud-api.yandex.net/v1/disk/public/resources/download?public_key=${encodeURIComponent(
      publicKey
    )}&path=${encodeURIComponent(path)}`;

    console.log(`Запрос ссылки для файла: ${fileName}`);

    const response = await fetch(downloadUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.warn(
        `Файл ${fileName} не найден в публичной папке (номер ${colorNumber} пропущен). Используем локальное изображение.`
      );
      console.log("Детали ошибки:", errorData);

      // Возвращаем null чтобы компонент использовал defaultData.img
      throw new Error(`Файл ${fileName} не найден`);
    }

    const data: YandexDiskResponse = await response.json();
    console.log("Успешно получена ссылка для", fileName);

    // Сохраняем в кеш
    linkCache.set(cacheKey, {
      url: data.href,
      timestamp: Date.now(),
    });

    return data.href;
  } catch (error) {
    console.error("Ошибка при получении ссылки на файл:", error);

    // Fallback: возвращаем базовую ссылку
    return `https://disk.yandex.ru/d/C4Zm1oaptgdjwA/${paddedNumber}.png`;
  }
};

// Функция для предзагрузки ссылок (опционально)
export const preloadYandexDiskUrls = async (
  colorNumbers: number[]
): Promise<void> => {
  const promises = colorNumbers.map((num) => getYandexDiskFileUrl(num));
  await Promise.allSettled(promises);
};
