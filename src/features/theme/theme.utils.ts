import type { ResolvedTheme, ThemePreference } from "./theme.types";

export const THEME_STORAGE_KEY = "theme";

export function isThemePreference(value: string | null): value is ThemePreference {
    return value === "light" || value === "dark" || value === "system";
}

export function getStoredThemePreference(): ThemePreference {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return isThemePreference(storedTheme) ? storedTheme : "system";
}

export function getSystemTheme(): ResolvedTheme {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function resolveTheme(preference: ThemePreference, systemTheme: ResolvedTheme): ResolvedTheme {
    return preference === "system" ? systemTheme : preference;
}

export function applyTheme(theme: ResolvedTheme): void {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
}
