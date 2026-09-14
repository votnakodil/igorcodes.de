import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

import { LanguageContext } from "./LanguageContext";
import type { Language, LanguagePreference } from "./language.types";
import {
    LANGUAGE_STORAGE_KEY,
    applyLanguage,
    getInitialLanguagePreference,
    resolveLanguage,
} from "./language.utils";

type LanguageProviderProps = {
    children: ReactNode;
};

function getInitialLanguage(): Language {
    const domLanguage = document.documentElement.dataset.language;

    if (domLanguage === "en" || domLanguage === "ru") {
        return domLanguage;
    }

    return resolveLanguage(getInitialLanguagePreference());
}

export function LanguageProvider({ children }: LanguageProviderProps) {
    const [preference, setPreferenceState] = useState<LanguagePreference>(getInitialLanguagePreference);
    const [language, setLanguage] = useState<Language>(getInitialLanguage);

    const setPreference = useCallback((nextPreference: LanguagePreference) => {
        const nextLanguage = resolveLanguage(nextPreference);

        try {
            localStorage.setItem(LANGUAGE_STORAGE_KEY, nextPreference);
        } catch {
            // The preference still works for the current session.
        }

        setPreferenceState(nextPreference);
        setLanguage(nextLanguage);
        applyLanguage(nextLanguage, nextPreference);
    }, []);

    useEffect(() => {
        applyLanguage(language, preference);
    }, [language, preference]);

    useEffect(() => {
        if (preference !== "auto") return;

        const handleLanguageChange = () => {
            const nextLanguage = resolveLanguage("auto");

            setLanguage(nextLanguage);
            applyLanguage(nextLanguage, "auto");
        };

        window.addEventListener("languagechange", handleLanguageChange);

        return () => {
            window.removeEventListener("languagechange", handleLanguageChange);
        };
    }, [preference]);

    const value = useMemo(
        () => ({
            language,
            preference,
            setPreference,
        }),
        [language, preference, setPreference],
    );

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}
