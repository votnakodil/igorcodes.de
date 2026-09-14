import { useLanguage } from "./useLanguage";
import { translations, type TranslationKey } from "./translations";

export function useTranslation() {
    const { language } = useLanguage();
    const t = (key: TranslationKey): string => translations[language][key];
    return { t, language };
}
