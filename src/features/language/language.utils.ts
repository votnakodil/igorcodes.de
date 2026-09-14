import type { Language, LanguagePreference } from "./language.types";

export const LANGUAGE_STORAGE_KEY = "language";

export function isLanguagePreference(value: string | null): value is LanguagePreference {
    return value === "en" || value === "ru" || value === "auto";
}

export function detectBrowserLanguage(): Language {
    const languages = navigator.languages?.length
        ? navigator.languages
        : [navigator.language];

    const primaryLanguage = languages[0]?.toLowerCase() ?? "en";

    return primaryLanguage.startsWith("ru") ? "ru" : "en";
}

export function resolveLanguage(preference: LanguagePreference): Language {
    return preference === "auto"
        ? detectBrowserLanguage()
        : preference;
}

export function getInitialLanguagePreference(): LanguagePreference {
    const domPreference = document.documentElement.dataset.languagePreference ?? null;

    if (isLanguagePreference(domPreference)) {
        return domPreference;
    }

    try {
        const storedPreference = localStorage.getItem(LANGUAGE_STORAGE_KEY);

        if (isLanguagePreference(storedPreference)) {
            return storedPreference;
        }

        const legacyPreference = localStorage.getItem("lang");
        const migratedPreference = legacyPreference === "autoLang" ? "auto" : legacyPreference;

        if (isLanguagePreference(migratedPreference)) {
            try {
                localStorage.setItem(LANGUAGE_STORAGE_KEY, migratedPreference);
            } catch {
                // Keep the migrated preference for this session if persistence is blocked.
            }
            return migratedPreference;
        }
    } catch {
        // localStorage may be unavailable in restricted browser contexts.
    }

    return "auto";
}

export function applyLanguage(language: Language, preference: LanguagePreference) {
    document.documentElement.lang = language;
    document.documentElement.dataset.language = language;
    document.documentElement.dataset.languagePreference = preference;
}
