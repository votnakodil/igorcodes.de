export type Language = "en" | "ru";
export type LanguagePreference = Language | "auto";

export type LanguageContextValue = {
    language: Language;
    preference: LanguagePreference;
    setPreference: (preference: LanguagePreference) => void;
};
