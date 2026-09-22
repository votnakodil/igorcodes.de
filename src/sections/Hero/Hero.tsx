import { ArrowIcon } from "@/components/Icons/ArrowIcon";
import { ShimmerText } from "@/components/ShimmerText/ShimmerText";
import { useTranslation } from "@/features/language/useTranslation";
import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import { useEffect } from "react";

import portrait from "@/assets/images/hero-portrait-new.jpg";
import { springs } from "@/motion/transitions";

import styles from "./Hero.module.css";

export function Hero() {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();
    const arrowControls = useAnimationControls();

    useEffect(() => {
        if (reduceMotion) return;
        let active = true;
        const pause = (milliseconds: number) => new Promise(resolve => window.setTimeout(resolve, milliseconds));
        const animateArrow = async () => {
            while (active) {
                await pause(2600);
                if (!active) break;
                await arrowControls.start({ y: 6, transition: { type: "spring", stiffness: 95, damping: 13, mass: 1.15 } });
                await arrowControls.start({ y: 0, transition: { type: "spring", stiffness: 82, damping: 12, mass: 1.2 } });
            }
        };
        void animateArrow();
        return () => { active = false; arrowControls.stop(); };
    }, [arrowControls, reduceMotion]);

    return (
        <section className={styles.hero}>
            <div className={styles.glow} aria-hidden="true" />

            <div data-header-blur-trigger className={styles.inner} style={{ backgroundImage: `url(${portrait})` }}>
                <div className={styles.copy}>
                    <motion.p
                        className={styles.eyebrow}
                        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...springs.hero, delay: 0.05 }}
                    >
                        {t("developer")}
                    </motion.p>

                    <motion.h1
                        className={styles.title}
                        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...springs.hero, delay: 0.13 }}
                    >
                        {t("firstName")}
                        <br />
                        {t("lastName")}
                    </motion.h1>

                    <motion.p
                        className={styles.description}
                        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...springs.hero, delay: 0.23 }}
                    >
                        {t("name__subtitle")}
                    </motion.p>

                    <motion.div
                        className={styles.actions}
                        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...springs.hero, delay: 0.32 }}
                    >
                        <a className={styles.primaryAction} href="#projects">
                            {t("explore")}
                            <ArrowIcon />
                        </a>

                        <a className={styles.secondaryAction} href="#experience">
                            {t("link3")}
                            <ArrowIcon />
                        </a>
                    </motion.div>
                </div>

                <div className={`${styles.visual} ${styles.desktopVisual}`} aria-hidden="true">
                    <div
                        className={styles.portraitFrame}
                        style={{ backgroundImage: `url(${portrait})` }}
                    />
                </div>
            </div>

            <motion.a
                className={styles.scrollHint}
                href="#projects"
                initial={reduceMotion ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springs.hero, delay: 0.72 }}
            >
                <ShimmerText>{t("scroll")}</ShimmerText>
                <motion.span className={styles.scrollArrow} animate={arrowControls}><ArrowIcon down /></motion.span>
            </motion.a>
        </section>
    );
}
