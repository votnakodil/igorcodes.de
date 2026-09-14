import { useTranslation } from "@/features/language/useTranslation";
import { motion } from "motion/react";

import { useTheme } from "@/features/theme/useTheme";
import { trackGoal } from "@/features/analytics/yandexMetrika";
import type { ThemePreference } from "@/features/theme/theme.types";
import { springs } from "@/motion/transitions";

import styles from "./ThemeSwitcher.module.css";

const options: { value: ThemePreference; label: "switch__option1" | "switch__option2" | "auto" }[] = [
    { value: "light", label: "switch__option1" },
    { value: "dark", label: "switch__option2" },
    { value: "system", label: "auto" },
];

export function ThemeSwitcher() {
    const { t } = useTranslation();
    const { preference, setPreference } = useTheme();

    return (
        <div className={styles.control} role="radiogroup" aria-label={t("appearance")}>
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
                            trackGoal(option.value === "system" ? "theme_auto" : `theme_${option.value}`);
                            setPreference(option.value);
                        }}
                    >
                        {selected && (
                            <motion.span
                                layoutId="theme-switcher-selection"
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
                            {t(option.label)}
                        </motion.span>
                    </button>
                );
            })}
        </div>
    );
}
