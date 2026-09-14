import { BrandIcon } from "@/components/Icons/BrandIcon";
import { ArrowIcon } from "@/components/Icons/ArrowIcon";
import { useTranslation } from "@/features/language/useTranslation";
import { trackGoal } from "@/features/analytics/yandexMetrika";
import { motion, useReducedMotion } from "motion/react";

import { revealSpring, revealSpringSoft, revealViewport } from "@/motion/transitions";

import styles from "./Contact.module.css";

export function Contact() {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();

    return (
        <section className={styles.contact} id="contact">
            <div className={styles.inner}>
                <motion.p
                    className={styles.eyebrow}
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={revealViewport}
                    transition={revealSpring}
                >
                    {t("link4")}
                </motion.p>

                <motion.h2
                    className={styles.title}
                    initial={reduceMotion ? false : { opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={revealViewport}
                    transition={{ ...revealSpring, delay: 0.06 }}
                >
                    {t("contactFirst")}
                    <br />
                    {t("contactLast")}
                </motion.h2>

                <motion.p
                    className={styles.description}
                    initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={revealViewport}
                    transition={{ ...revealSpringSoft, delay: 0.12 }}
                >
                    {t("contactDescription")}
                </motion.p>

                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={revealViewport}
                    transition={{ ...revealSpringSoft, delay: 0.18 }}
                >
                    <a className={styles.action} href="mailto:hello@igorcodes.de" onClick={() => trackGoal("contact_email")}>
                        {t("email")}
                        <ArrowIcon />
                    </a>
                </motion.div>

                <motion.div
                    className={styles.links}
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={revealViewport}
                    transition={{ ...revealSpringSoft, delay: 0.24 }}
                >
                    <motion.a
                        href="https://github.com/votnakodil"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackGoal("contact_github")}
                        initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={revealViewport}
                        transition={{ ...revealSpringSoft, delay: 0.28 }}
                    >
                        <BrandIcon name="github" /> GitHub
                        <ArrowIcon />
                    </motion.a>

                    <motion.a
                        href="https://www.linkedin.com/in/igorvo1kov"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackGoal("contact_linkedin")}
                        initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={revealViewport}
                        transition={{ ...revealSpringSoft, delay: 0.33 }}
                    >
                        <BrandIcon name="linkedin" /> LinkedIn
                        <ArrowIcon />
                    </motion.a>

                    <motion.a
                        href="https://t.me/tochnoetoon"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackGoal("contact_telegram")}
                        initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={revealViewport}
                        transition={{ ...revealSpringSoft, delay: 0.38 }}
                    >
                        <BrandIcon name="telegram" /> Telegram
                        <ArrowIcon />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
