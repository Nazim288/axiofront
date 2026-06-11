export const YANDEX_METRIKA_COUNTER_ID = 109033511;

/** Идентификаторы целей типа «JavaScript-событие» в интерфейсе Яндекс.Метрики */
export const YANDEX_METRIKA_GOALS = {
  USER_REGISTRATION: "user_registration",
} as const;

type YmFunction = (
  counterId: number,
  method: string,
  ...args: unknown[]
) => void;

declare global {
  interface Window {
    ym?: YmFunction;
  }
}

/**
 * Отправляет достижение цели в Яндекс.Метрику.
 * @see https://yandex.ru/support/metrica/ru/objects/reachgoal
 */
export function reachYandexMetrikaGoal(
  goalId: (typeof YANDEX_METRIKA_GOALS)[keyof typeof YANDEX_METRIKA_GOALS],
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined" || !window.ym) {
    return;
  }

  window.ym(YANDEX_METRIKA_COUNTER_ID, "reachGoal", goalId, params);
}
