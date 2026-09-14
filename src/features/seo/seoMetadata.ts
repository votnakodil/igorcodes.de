import type { Language } from "@/features/language/language.types";

export type SeoMetadata = {
    title: string;
    description: string;
    locale: "en_US" | "ru_RU";
};

const SEO_METADATA: Record<Language, SeoMetadata> = {
    en: {
        title: "Igor Volkov — Developer",
        description: "Personal website and portfolio of Igor Volkov, a developer creating mobile and web experiences.",
        locale: "en_US",
    },
    ru: {
        title: "Игорь Волков — Разработчик",
        description: "Личный сайт и портфолио Игоря Волкова — разработчика мобильных и веб-продуктов.",
        locale: "ru_RU",
    },
};

export function getSeoMetadata(language: Language): SeoMetadata {
    return SEO_METADATA[language];
}

function setMetaContent(selector: string, content: string): void {
    document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", content);
}

export function applySeoMetadata(language: Language): void {
    const metadata = getSeoMetadata(language);

    document.title = metadata.title;
    setMetaContent('meta[name="description"]', metadata.description);
    setMetaContent('meta[property="og:title"]', metadata.title);
    setMetaContent('meta[property="og:description"]', metadata.description);
    setMetaContent('meta[property="og:locale"]', metadata.locale);
    setMetaContent('meta[name="twitter:title"]', metadata.title);
    setMetaContent('meta[name="twitter:description"]', metadata.description);
}
