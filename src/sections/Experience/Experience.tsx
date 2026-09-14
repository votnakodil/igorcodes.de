import { ArrowIcon } from "@/components/Icons/ArrowIcon";
import { ExpandableDetails } from "@/components/ExpandableDetails/ExpandableDetails";
import { ResumeDownload } from "@/components/ResumeDownload/ResumeDownload";
import { motion, useReducedMotion } from "motion/react";
import { useTranslation } from "@/features/language/useTranslation";
import type { TranslationKey } from "@/features/language/translations";
import { revealSpring, revealViewport } from "@/motion/transitions";
import freeLinesLogo from "@/assets/icons/brand-free-lines.svg";
import styles from "./Experience.module.css";

type ExperienceEntry = {
    id: string;
    date: TranslationKey;
    title: TranslationKey;
    subtitle: TranslationKey;
    details: TranslationKey[];
    technologies: TranslationKey[];
};

// Employment dates and achievements: user-supplied resume, updated 12 September 2026.
const entries: ExperienceEntry[] = [
    { id: "one-c", date: "oneCDate", title: "oneCTitle", subtitle: "companyName",
        details: ["oneCDetail1", "oneCDetail2", "oneCDetail3", "oneCDetail4", "oneCDetail5", "oneCDetail6", "oneCDetail7"],
        technologies: ["oneCTagPlatform", "oneCTagERP", "oneCTagQueries", "oneCTagDCS", "oneCTagForms"] },
    { id: "bpm", date: "bpmDate", title: "bpmTitle", subtitle: "companyName",
        details: ["bpmDetail1", "bpmDetail2", "bpmDetail3", "bpmDetail4", "bpmDetail5", "bpmDetail6", "bpmDetail7", "bpmDetail8"],
        technologies: ["bpmTagFirstForm", "bpmTagN8n", "bpmTagMSSQL", "bpmTagSQL", "bpmTagAI"] },
    { id: "sales", date: "salesDate", title: "salesTitle", subtitle: "companyName",
        details: ["salesDetail1", "salesDetail2", "salesDetail3"], technologies: [] },
];

export function Experience() {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();

    return (
        <section className={styles.experience} id="experience" aria-labelledby="experience-title">
            <div className={styles.inner}>
                <motion.header className={styles.header}
                    initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={revealViewport} transition={revealSpring}>
                    <p className={styles.eyebrow}>{t("link3")}</p>
                    <h2 className={styles.title} id="experience-title">{t("experienceTitle")}</h2>
                </motion.header>
                <ol className={styles.timeline}>
                    {entries.map(entry => (
                        <li key={entry.id} className={styles.step}>
                            <span className={styles.dot} aria-hidden="true" />
                            <motion.article initial={reduceMotion ? false : { opacity: 0 }}
                                whileInView={{ opacity: 1 }} viewport={revealViewport}
                                transition={reduceMotion ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }}>
                                <p className={styles.date}>{t(entry.date)}</p>
                                <h3 className={styles.role}>{t(entry.title)}</h3>
                                <p className={styles.subtitle}>
                                    <a href="https://free-lines.ru" target="_blank" rel="noreferrer">
                                        <img className={styles.companyLogo} src={freeLinesLogo} alt="" aria-hidden="true" />
                                        <span>{t(entry.subtitle)}</span>
                                        <ArrowIcon />
                                    </a>
                                </p>
                                <ExpandableDetails
                                    items={entry.details.map(key => t(key))}
                                    showLabel={t("showAllDetails")}
                                    collapseLabel={t("collapseDetails")}
                                />
                                {entry.technologies.length > 0 && (
                                    <ul className={styles.tags} aria-label={t("technologies")}>
                                        {entry.technologies.map(technology => <li key={technology}>{t(technology)}</li>)}
                                    </ul>
                                )}
                            </motion.article>
                        </li>
                    ))}
                </ol>
                <div className={styles.download}>
                    <ResumeDownload />
                </div>
            </div>
        </section>
    );
}
