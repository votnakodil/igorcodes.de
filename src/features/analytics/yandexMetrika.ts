export const YANDEX_METRIKA_COUNTER_ID = 112585826;

export type YandexMetrikaGoal =
    | "settings_open"
    | "project_tab_swift"
    | "project_tab_web"
    | "project_open_kursvalut"
    | "project_open_flc_calculator"
    | "project_open_custom_numpad"
    | "project_open_nft"
    | "project_open_livetv"
    | "project_open_riksha"
    | "project_open_pages"
    | "resume_download_open"
    | "resume_captcha_success"
    | "resume_download"
    | "contact_email"
    | "contact_github"
    | "contact_linkedin"
    | "contact_telegram"
    | "language_en"
    | "language_ru"
    | "language_auto"
    | "theme_light"
    | "theme_dark"
    | "theme_auto";

const projectOpenGoals: Readonly<Record<string, YandexMetrikaGoal>> = {
    kursvalut: "project_open_kursvalut",
    "flc-calculator": "project_open_flc_calculator",
    "custom-numpad": "project_open_custom_numpad",
    nft: "project_open_nft",
    livetv: "project_open_livetv",
    riksha: "project_open_riksha",
    pages: "project_open_pages",
};

export function trackGoal(goal: YandexMetrikaGoal): void {
    if (typeof window === "undefined" || typeof window.ym !== "function") return;
    window.ym(YANDEX_METRIKA_COUNTER_ID, "reachGoal", goal);
}

export function trackPageView(url = typeof window === "undefined" ? "" : window.location.href): void {
    if (!url || typeof window === "undefined" || typeof window.ym !== "function") return;
    window.ym(YANDEX_METRIKA_COUNTER_ID, "hit", url);
}

export function getProjectOpenGoal(projectId: string): YandexMetrikaGoal | undefined {
    return projectOpenGoals[projectId];
}
