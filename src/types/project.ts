import type { TranslationKey } from "@/features/language/translations";

export type ProjectCategory = "swift" | "web";

export type ProjectVisual =
    | { type: "cover"; source: string }
    | { type: "showcase"; variant: "trio"; badge: string; left: string; right: string }
    | { type: "showcase"; variant: "split"; badge: string; right: string };

export type ProjectLink = {
    kind: "website" | "github" | "appStore" | "article";
    label: TranslationKey | "GitHub";
    url: string;
};

export type ProjectRating = {
    score: string;
    count: number;
};

export type Project = {
    id: string;
    title: string;
    titleKey?: TranslationKey;
    category: ProjectCategory;
    description: TranslationKey;
    technologies: string[];
    rating?: ProjectRating;
    visual: ProjectVisual;
    links: ProjectLink[];
};
