import { motion } from "motion/react";
import { trackGoal } from "@/features/analytics/yandexMetrika";

import { useLanguage } from "./useLanguage";
import { useTranslation } from "./useTranslation";
import type { LanguagePreference } from "./language.types";
import { springs } from "@/motion/transitions";

import styles from "@/features/theme/ThemeSwitcher/ThemeSwitcher.module.css";

const options: { value: LanguagePreference; label: string }[] = [
    { value: "en", label: "English" },
    { value: "ru", label: "Русский" },
    { value: "auto", label: "Auto" },
];

export function LanguageSwitcher() {
    const { preference, setPreference } = useLanguage();
    const { t } = useTranslation();

    return (
        <div className={styles.control} role="radiogroup" aria-label={t("switch__title2")}>
            {options.map((option) => {
                const selected = preference === option.value;

                return (
                    <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        className={styles.option}
                        onClick={() => {
                            trackGoal(`language_${option.value}`);
                            setPreference(option.value);
                        }}
                    >
                        {selected && (
                            <motion.span
                                layoutId="language-switcher-selection"
                                className={styles.selection}
                                transition={springs.segmented}
                            />
                        )}

                        <motion.span
                            className={styles.label}
                            animate={{
                                scale: selected ? 1 : 0.98,
                                opacity: selected ? 1 : 0.68,
                            }}
                            transition={springs.segmentedLabel}
                        >
                            {option.value === "auto" ? t("auto") : option.label}
                        </motion.span>
                    </button>
                );
            })}
        </div>
    );
}
