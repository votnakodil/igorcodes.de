import { IconSwift } from "symbols-react";
import { BrandIcon } from "@/components/Icons/BrandIcon";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslation } from "@/features/language/useTranslation";
import { ProjectGallery } from "./ProjectGallery";
import { projects } from "@/content/projects";
import { revealSpring, revealViewport } from "@/motion/transitions";
import type { ProjectCategory } from "@/types/project";
import styles from "./Projects.module.css";

const categories: ProjectCategory[] = ["swift", "web"];

export function Projects() {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();
    const [category, setCategory] = useState<ProjectCategory>("swift");
    const tabs = useRef<(HTMLButtonElement | null)[]>([]);

    return (
        <section className={styles.projects} id="projects" aria-labelledby="projects-title">
            <div className={styles.inner}>
                <motion.header className={styles.header}
                    initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }} viewport={revealViewport} transition={revealSpring}>
                    <p className={styles.eyebrow}>{t("portfolio")}</p>
                    <h2 className={styles.title} id="projects-title">{t("headline1")}</h2>
                </motion.header>
                <div className={styles.tabs} role="tablist" aria-label={t("headline1")}>
                    {categories.map((value, index) => (
                        <button key={value} ref={node => { tabs.current[index] = node; }}
                            type="button" role="tab" id={`projects-tab-${value}`}
                            aria-selected={category === value} aria-controls={`projects-panel-${value}`}
                            tabIndex={category === value ? 0 : -1}
                            onClick={() => setCategory(value)}
                            onKeyDown={event => {
                                let next: number;
                                if (event.key === "ArrowRight" || event.key === "ArrowLeft") next = 1 - index;
                                else if (event.key === "Home") next = 0;
                                else if (event.key === "End") next = 1;
                                else return;
                                event.preventDefault();
                                setCategory(categories[next]);
                                tabs.current[next]?.focus();
                            }}>
                            {category === value && <motion.span className={styles.selection} layoutId="project-category"
                                transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }} />}
                            <span className={styles.tabLabel}>{value === "swift" ? <IconSwift width={18} height={18} aria-hidden="true" /> : <BrandIcon name="html5" />}{t(value === "swift" ? "tab1" : "tab2")}</span>
                        </button>
                    ))}
                </div>
                {categories.map(value => (
                    <div key={value} role="tabpanel" id={`projects-panel-${value}`}
                        aria-labelledby={`projects-tab-${value}`} hidden={category !== value} tabIndex={0}>
                        {category === value && (
                            <ProjectGallery key={value} projects={projects.filter(project => project.category === value)} />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
