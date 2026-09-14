import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import type {
    ResolvedTheme,
    ThemePreference,
} from "./theme.types";

import {
    applyTheme,
    getStoredThemePreference,
    getSystemTheme,
    resolveTheme,
    THEME_STORAGE_KEY,
} from "./theme.utils";

export type ThemeContextValue = {
    preference: ThemePreference;
    resolvedTheme: ResolvedTheme;
    setPreference: (
        preference: ThemePreference,
    ) => void;
};

export const ThemeContext =
    createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
    children: React.ReactNode;
};

export function ThemeProvider({
    children,
}: ThemeProviderProps) {
    const [preference, setPreferenceState] =
        useState<ThemePreference>(
            getStoredThemePreference,
        );

    const [systemTheme, setSystemTheme] =
        useState<ResolvedTheme>(getSystemTheme);

    const resolvedTheme = resolveTheme(
        preference,
        systemTheme,
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            "(prefers-color-scheme: dark)",
        );

        const handleChange = () => {
            setSystemTheme(
                mediaQuery.matches
                    ? "dark"
                    : "light",
            );
        };

        mediaQuery.addEventListener(
            "change",
            handleChange,
        );

        return () => {
            mediaQuery.removeEventListener(
                "change",
                handleChange,
            );
        };
    }, []);

    useEffect(() => {
        applyTheme(resolvedTheme);
    }, [resolvedTheme]);

    const setPreference = useCallback(
        (newPreference: ThemePreference) => {
            localStorage.setItem(
                THEME_STORAGE_KEY,
                newPreference,
            );

            setPreferenceState(newPreference);
        },
        [],
    );

    const value = useMemo(
        () => ({
            preference,
            resolvedTheme,
            setPreference,
        }),
        [
            preference,
            resolvedTheme,
            setPreference,
        ],
    );

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}
