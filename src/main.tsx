import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "@/app/App";
import { trackPageView } from "@/features/analytics/yandexMetrika";
import { LanguageProvider } from "@/features/language/LanguageProvider";
import { ThemeProvider } from "@/features/theme/ThemeProvider";

import "./styles/fonts.css";
import "./styles/reset.css";
import "./styles/tokens.css";
import "./styles/globals.css";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Root element was not found");

let chineseFontRequested = false;

const loadChineseFont = () => {
    if (
        !chineseFontRequested
        && document.documentElement.lang.toLowerCase().startsWith("zh")
    ) {
        chineseFontRequested = true;
        void import("@fontsource-variable/noto-sans-sc");
    }
};

new MutationObserver(loadChineseFont).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
});
loadChineseFont();

trackPageView();

createRoot(rootElement).render(
    <StrictMode>
        <LanguageProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </LanguageProvider>
    </StrictMode>,
);
