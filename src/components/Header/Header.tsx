import { LanguageSwitcher } from "@/features/language/LanguageSwitcher";
import { useTranslation } from "@/features/language/useTranslation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Liquid } from "liquid-gooey";
import { IconGear, IconLaurelLeading, IconLaurelTrailing, IconLine3Horizontal, IconXmark } from "symbols-react";

import { ThemeSwitcher } from "@/features/theme/ThemeSwitcher/ThemeSwitcher";
import { trackGoal } from "@/features/analytics/yandexMetrika";
import {
    liquidPopoverContentExit,
    liquidPopoverContentTransition,
    liquidPopoverExitTransition,
    liquidPopoverItemTransition,
    liquidPopoverMorph,
    liquidPopoverPanelTransition,
} from "@/motion/liquidPopover";

import { nextHeaderPopover, type HeaderPopover } from "./headerPopoverState";
import styles from "./Header.module.css";

export function Header() {
    const { t, language } = useTranslation();
    const [activePopover, setActivePopover] = useState<HeaderPopover>(null);
    const [scrolled, setScrolled] = useState(() => typeof window !== "undefined" && window.scrollY > 1);
    const controlsRef = useRef<HTMLDivElement>(null);
    const menuOpen = activePopover === "menu";
    const settingsOpen = activePopover === "settings";
    const compactSettings = typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches;
    const adaptiveHeader = typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches;
    const rightAlignedSettings = typeof window !== "undefined" && window.matchMedia("(max-width: 1397px)").matches;
    const settingsGooWidth = typeof window !== "undefined" ? Math.min(292, Math.max(0, window.innerWidth - 28)) : 292;
    const settingsButtonWidth = compactSettings ? 40 : language === "ru" ? 108 : 94;
    // On desktop the panel is centered under the full Settings pill. On the
    // compact layout the panel fills the available width, so its drop should
    // land at the pill's right-hand button instead of travelling to the
    // panel's (off-screen) centre.
    const settingsIconCenterX = adaptiveHeader ? 20 : 16.5;
    const settingsDropX = rightAlignedSettings
        ? settingsIconCenterX + 9 - settingsButtonWidth
        : 9 - settingsGooWidth / 2;
    const settingsDropY = adaptiveHeader ? -53 : -58;

    const closePopovers = useCallback(() => {
        if (!activePopover) return;
        requestAnimationFrame(() => setActivePopover(null));
    }, [activePopover]);

    useEffect(() => {
        const updateScrolled = () => setScrolled(window.scrollY > 1);
        updateScrolled();
        window.addEventListener("scroll", updateScrolled, { passive: true });
        return () => window.removeEventListener("scroll", updateScrolled);
    }, []);

    useEffect(() => {
        const handlePointerDown = (event: PointerEvent) => {
            if (!controlsRef.current?.contains(event.target as Node)) closePopovers();
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") closePopovers();
        };

        window.addEventListener("pointerdown", handlePointerDown);
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("pointerdown", handlePointerDown);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [closePopovers]);

    return (
        <header className={styles.header} data-scrolled={scrolled || undefined}>
            <div className={styles.inner}>
                <a className={styles.brand} href="/" aria-label={t("name__title")}>
                    <IconLaurelLeading className={styles.brandLaurel} fill="currentColor" aria-hidden="true" />
                    <span className={styles.brandInitials}>{language === "ru" ? "ИВ" : "IV"}</span>
                    <IconLaurelTrailing className={styles.brandLaurel} fill="currentColor" aria-hidden="true" />
                </a>

                <div ref={controlsRef} className={styles.right}>
                    <nav className={styles.navigation} aria-label={t("navigation")}>
                        <a href="#projects">{t("link1")}</a>
                        <a href="#about">{t("link2")}</a>
                        <a href="#experience">{t("link3")}</a>
                        <a href="#contact">{t("link4")}</a>
                    </nav>

                    <div className={styles.mobileMenu}>
                        <Liquid className={styles.menuGoo} blur={11} contrast={18} filterPadding={128}
                            fill="var(--color-button)" shadow="0 16px 42px rgba(0,73,170,.26)">
                            <Liquid.Item className={styles.menuButtonItem} observe radius={999}
                                morph={{ advanced: { blobInset: 4 } }}>
                                <button type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation"
                                    aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
                                    className={styles.menuButton}
                                    onClick={() => setActivePopover(current => nextHeaderPopover(current, "menu"))}>
                                    <span className={styles.menuIcon} aria-hidden="true">
                                        <AnimatePresence initial={false} mode="sync">
                                            <motion.span
                                                className={`${styles.menuGlyph} ${menuOpen ? styles.closeGlyph : ""}`}
                                                key={menuOpen ? "close" : "menu"}
                                                initial={{ opacity: 0, rotate: menuOpen ? -42 : 42, scale: 0.76 }}
                                                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                                exit={{ opacity: 0, rotate: menuOpen ? 42 : -42, scale: 0.76 }}
                                                transition={{ type: "spring", stiffness: 430, damping: 30, mass: 0.56 }}
                                            >
                                                {menuOpen
                                                    ? <IconXmark fill="currentColor" width="17" height="17" />
                                                    : <IconLine3Horizontal fill="currentColor" width="17" height="17" />}
                                            </motion.span>
                                        </AnimatePresence>
                                    </span>
                                </button>
                            </Liquid.Item>
                            <AnimatePresence>
                                {menuOpen && (
                                    <Liquid.Item morph={liquidPopoverMorph} transition={liquidPopoverItemTransition}>
                                        <motion.nav id="mobile-navigation" className={styles.menuPanel}
                                            aria-label={t("navigation")}
                                            initial={{ width: 18, height: 18, x: 0, y: -58, borderRadius: 999 }}
                                            animate={{ width: 224, height: 210, x: 0, y: 0, borderRadius: 24 }}
                                            exit={{ width: 18, height: 18, x: 0, y: -58, borderRadius: 999,
                                                transition: liquidPopoverExitTransition }}
                                            transition={liquidPopoverPanelTransition}>
                                            <motion.div className={styles.menuContent}
                                                initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                                                exit={liquidPopoverContentExit}
                                                transition={liquidPopoverContentTransition}>
                                                <a href="#projects" onClick={closePopovers}>{t("link1")}</a>
                                                <a href="#about" onClick={closePopovers}>{t("link2")}</a>
                                                <a href="#experience" onClick={closePopovers}>{t("link3")}</a>
                                                <a href="#contact" onClick={closePopovers}>{t("link4")}</a>
                                            </motion.div>
                                        </motion.nav>
                                    </Liquid.Item>
                                )}
                            </AnimatePresence>
                        </Liquid>
                    </div>

                    <div className={styles.settings} data-language={language}>
                        <Liquid className={styles.settingsGoo} blur={11} contrast={18} filterPadding={128}
                            fill="var(--color-button)" shadow="0 16px 42px rgba(0,73,170,.26)">
                            <Liquid.Item className={styles.settingsButtonItem} observe radius={999}
                                morph={{ advanced: { blobInset: 4 } }}>
                                <button type="button" aria-expanded={settingsOpen} className={styles.settingsButton}
                                    onClick={() => {
                                        const nextPopover = nextHeaderPopover(activePopover, "settings");
                                        if (nextPopover === "settings") trackGoal("settings_open");
                                        setActivePopover(nextPopover);
                                    }}>
                                    <span className={styles.settingsIconSlot} aria-hidden="true" />
                                    <span className={styles.settingsLabel}>{t("settings")}</span>
                                </button>
                            </Liquid.Item>
                            <AnimatePresence>
                                {settingsOpen && (
                                    <Liquid.Item morph={liquidPopoverMorph}
                                        transition={liquidPopoverItemTransition}>
                                        <motion.div className={styles.settingsPanel}
                                            initial={{ width: 18, height: 18, x: settingsDropX, y: settingsDropY, borderRadius: 999 }}
                                            animate={{ width: settingsGooWidth, height: 200, x: 0, y: 0, borderRadius: 24 }}
                                            exit={{ width: 18, height: 18, x: settingsDropX, y: settingsDropY, borderRadius: 999,
                                                transition: liquidPopoverExitTransition }}
                                            transition={liquidPopoverPanelTransition}>
                                            <motion.div className={styles.popoverContent}
                                                initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                                                exit={liquidPopoverContentExit}
                                                transition={liquidPopoverContentTransition}>
                                                <h2 className={styles.popoverTitle}>{t("settings")}</h2>
                                                <div className={styles.settingRow}>
                                                    <span className={styles.settingLabel}>{t("appearance")}</span>
                                                    <ThemeSwitcher />
                                                </div>
                                                <div className={styles.settingRow}>
                                                    <span className={styles.settingLabel}>{t("switch__title2")}</span>
                                                    <LanguageSwitcher />
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    </Liquid.Item>
                                )}
                            </AnimatePresence>
                        </Liquid>
                        <span className={`${styles.settingsIconOverlay} ${settingsOpen ? styles.settingsIconOverlayOpen : ""}`}
                            aria-hidden="true">
                            <span className={styles.settingsIconRotor}>
                                <IconGear className={styles.settingsIcon} fill="currentColor" width="17" height="17" />
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}
