import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "@/app/App";
import { trackPageView } from "@/features/analytics/yandexMetrika";
import { LanguageProvider } from "@/features/language/LanguageProvider";
import { ThemeProvider } from "@/features/theme/ThemeProvider";

import "./styles/reset.css";
import "./styles/tokens.css";
import "./styles/globals.css";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Root element was not found");

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
