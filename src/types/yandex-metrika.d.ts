import type { YandexMetrikaGoal } from "@/features/analytics/yandexMetrika";

declare global {
    interface Window {
        ym?: {
            (counterId: number, method: "reachGoal", goal: YandexMetrikaGoal): void;
            (counterId: number, method: "hit", url: string): void;
        };
    }
}

export {};
