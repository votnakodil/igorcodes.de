import { createContext } from "react";

import type { LanguageContextValue } from "./language.types";

export const LanguageContext = createContext<LanguageContextValue | null>(null);
