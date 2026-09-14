import { useTranslation } from "@/features/language/useTranslation";
import { motion, useReducedMotion } from "motion/react";

import aboutStageImage from "@/assets/images/about/about-stage-optimized.jpg";
import articleVcLogo from "@/assets/icons/brand-vc-ru.svg";
import { ArrowIcon } from "@/components/Icons/ArrowIcon";
import { revealSpring, revealSpringSoft, revealViewport } from "@/motion/transitions";

import styles from "./About.module.css";

export function About() {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();

    return (
        <section className={styles.about} id="about">
            <div className={styles.inner}>
                <motion.header
                    className={styles.header}
                    initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={revealViewport}
                    transition={revealSpring}
                >
                    <p className={styles.eyebrow}>{t("link2")}</p>

                    <h2 className={styles.title}>
                        {t("headlineS")}
                        <br />
                        {t("headlineB")}
                    </h2>
                </motion.header>

                <div className={styles.intro}>
                    <motion.div
                        className={styles.imageFrame}
                        initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.99 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={revealViewport}
                        transition={revealSpringSoft}
                    >
                        <img
                            className={styles.image}
                            src={aboutStageImage}
                            alt={t("name__title")}
                            loading="eager"
                            fetchPriority="high"
                            decoding="async"
                        />
                        <p className={styles.goal}>{t("aboutGoal")}</p>
                    </motion.div>
                </div>

                <div className={styles.articles}>
                    <motion.article
                        className={styles.articleFeature}
                        initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.99 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={revealViewport}
                        transition={{ ...revealSpringSoft, delay: 0.1 }}
                    >
                        <div className={styles.articleCopy}>
                            <span className={`${styles.quoteMark} ${styles.quoteMarkOpen}`} aria-hidden="true">“</span>

                            <blockquote className={styles.quote}>
                                <p>{t("workArticleQuote")}</p>
                            </blockquote>

                            <div className={styles.quoteFooter}>
                                <a
                                    className={styles.articleLink}
                                    href="https://vc.ru/free_lines/1805987-razrabotka-nashego-mobilnogo-prilozheniya-ot-idei-do-reliza"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img className={styles.articleLinkBrand} src={articleVcLogo} alt="" aria-hidden="true" />
                                    {t("readArticle")}
                                    <ArrowIcon />
                                </a>

                                <span className={`${styles.quoteMark} ${styles.quoteMarkClose}`} aria-hidden="true">”</span>
                            </div>
                        </div>

                        <div className={styles.articleBrand}>
                            <img src={articleVcLogo} alt="vc.ru" loading="lazy" decoding="async" />
                        </div>
                    </motion.article>
                </div>
            </div>
        </section>
    );
}
