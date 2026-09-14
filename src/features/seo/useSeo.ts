import { useEffect } from "react";

import { useLanguage } from "@/features/language/useLanguage";

import { applySeoMetadata } from "./seoMetadata";

export function useSeo(): void {
    const { language } = useLanguage();

    useEffect(() => {
        applySeoMetadata(language);
    }, [language]);
}
