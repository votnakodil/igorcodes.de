import { useTranslation } from "@/features/language/useTranslation";
import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import { technologyGroups, type Technology } from "@/content/technologies";
import { revealSpring, revealSpringSoft, revealViewport } from "@/motion/transitions";
import styles from "./Technologies.module.css";

function TechnologyIcon({ technology }: { technology: Technology }) {
    return <span className={styles.icon} style={{ maskImage: `url("${technology.icon}")`, WebkitMaskImage: `url("${technology.icon}")` } as CSSProperties} aria-hidden="true" />;
}

export function Technologies() {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();
    return (
        <section className={styles.technologies} id="technologies"><div className={styles.inner}>
            <motion.header className={styles.header} initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={revealViewport} transition={revealSpring}>
                <p className={styles.eyebrow}>{t("technologies")}</p><h2 className={styles.title}>{t("tools")}</h2>
            </motion.header>
            <div className={styles.groups}>{technologyGroups.map((group, groupIndex) => (
                <motion.section className={styles.group} key={group.title} initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={revealViewport} transition={{ ...revealSpringSoft, delay: groupIndex * 0.06 }}>
                    <h3 className={styles.groupTitle}>{t(group.title)}</h3>
                    <ul className={styles.list}>{group.technologies.map((technology, index) => (
                        <motion.li className={styles.item} key={technology.name} initial={reduceMotion ? false : { opacity: 0, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={revealViewport} transition={{ ...revealSpringSoft, delay: .04 + index * .025 }}>
                            <TechnologyIcon technology={technology} /><span>{technology.name}</span>
                        </motion.li>
                    ))}</ul>
                </motion.section>
            ))}</div>
        </div></section>
    );
}
