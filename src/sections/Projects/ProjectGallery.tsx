import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useDragControls } from "motion/react";
import { ProjectCard } from "@/components/ProjectCard/ProjectCard";
import { useTranslation } from "@/features/language/useTranslation";
import type { Project } from "@/types/project";
import styles from "./Projects.module.css";

const slideSpring = { type: "spring", stiffness: 150, damping: 30, mass: 1 } as const;
const autoplayDuration = 20_000;

export function ProjectGallery({ projects }: { projects: Project[] }) {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();
    const [active, setActive] = useState(0);
    const [stride, setStride] = useState(0);
    const [progressCycle, setProgressCycle] = useState(0);
    const [autoplayRequested, setAutoplayRequested] = useState(true);
    const [isGalleryVisible, setIsGalleryVisible] = useState(false);
    const [isDocumentVisible, setIsDocumentVisible] = useState(() => document.visibilityState === "visible");
    const isCardHovered = useRef(false);
    const progressFill = useRef<HTMLSpanElement>(null);
    const gallery = useRef<HTMLDivElement>(null);
    const track = useRef<HTMLUListElement>(null);
    const x = useMotionValue(0);
    const dragControls = useDragControls();
    const last = projects.length - 1;
    const select = useCallback((index: number) => {
        setActive(Math.max(0, Math.min(last, index)));
        setProgressCycle(cycle => cycle + 1);
    }, [last]);
    const canAutoplay = !reduceMotion && projects.length > 1;
    const isAutoplayRunning = canAutoplay && autoplayRequested && isGalleryVisible && isDocumentVisible;

    const setCardHover = (hovered: boolean) => {
        isCardHovered.current = hovered;
        if (progressFill.current) progressFill.current.style.animationPlayState = hovered ? "paused" : isAutoplayRunning ? "running" : "paused";
    };

    const advanceAutoplay = useCallback(() => {
        if (!autoplayRequested || !isDocumentVisible || isCardHovered.current) return;
        setActive(current => current === last ? 0 : current + 1);
        setProgressCycle(cycle => cycle + 1);
    }, [autoplayRequested, isDocumentVisible, last]);

    useLayoutEffect(() => {
        const element = track.current;
        if (!element?.firstElementChild) return;
        const measure = () => {
            const width = element.firstElementChild!.getBoundingClientRect().width;
            setStride(width + parseFloat(getComputedStyle(element).columnGap));
        };
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const animation = animate(x, -active * stride, reduceMotion ? { duration: 0 } : slideSpring);
        return () => animation.stop();
    }, [active, stride, reduceMotion, x]);

    useEffect(() => {
        const element = gallery.current;
        if (!element) return;
        const observer = new IntersectionObserver(([entry]) => {
            setIsGalleryVisible(entry.isIntersecting && entry.intersectionRatio >= .15);
        }, { threshold: [0, .15] });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const updateVisibility = () => setIsDocumentVisible(document.visibilityState === "visible");
        document.addEventListener("visibilitychange", updateVisibility);
        return () => document.removeEventListener("visibilitychange", updateVisibility);
    }, []);

    return (
        <div ref={gallery} className={styles.gallery} role="region" aria-roledescription={t("carousel")}
            aria-label={t("headline1")} onKeyDown={event => {
                if ((event.target as HTMLElement).closest("a")) return;
                if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                    event.preventDefault();
                    select(active + (event.key === "ArrowRight" ? 1 : -1));
                } else if (event.key === "Home" || event.key === "End") {
                    event.preventDefault();
                    select(event.key === "Home" ? 0 : last);
                }
            }}>
            <div className={styles.viewport}>
                <motion.ul ref={track} className={styles.track} style={{ x }}
                    drag={reduceMotion ? false : "x"} dragMomentum={false}
                    dragListener={false} dragControls={dragControls}
                    onPointerDown={event => {
                        if (!reduceMotion && event.pointerType === "touch") dragControls.start(event);
                    }}
                    dragConstraints={{ left: -last * stride, right: 0 }} dragElastic={.08}
                    onDragEnd={(_event, info) => {
                        const threshold = Math.min(80, stride * .15);
                        const direction = Math.abs(info.offset.x) > threshold ? -Math.sign(info.offset.x)
                            : Math.abs(info.velocity.x) > 500 ? -Math.sign(info.velocity.x) : 0;
                        const next = Math.max(0, Math.min(last, active + direction));
                        select(next);
                        if (next === active) animate(x, -active * stride, slideSpring);
                    }}>
                    {projects.map((project, index) => (
                        <li key={project.id} className={styles.slide} aria-hidden={index !== active}
                            onMouseEnter={index === active ? () => setCardHover(true) : undefined}
                            onMouseLeave={index === active ? () => setCardHover(false) : undefined}
                            inert={index !== active} aria-label={`${index + 1} / ${projects.length}`}>
                            <ProjectCard project={project} />
                        </li>
                    ))}
                </motion.ul>
            </div>
            <div className={styles.controls}>
                <div className={styles.autoplayControls}>
                    <div className={styles.dots} aria-label={t("selectProject")}>
                        {projects.map((project, index) => (
                            <button type="button" key={project.id} className={styles.dotButton}
                                onClick={() => select(index)} aria-label={`${t("showProject")} ${project.titleKey ? t(project.titleKey) : project.title}`}
                                aria-current={index === active ? "true" : undefined}>
                                <span className={styles.dot}>
                                    {index === active && canAutoplay && (
                                        <span ref={progressFill} key={`${active}-${progressCycle}`} className={`${styles.progressFill} ${isAutoplayRunning ? styles.progressRunning : ""}`}
                                            style={{ "--project-autoplay-duration": `${autoplayDuration}ms` } as CSSProperties}
                                            onAnimationEnd={advanceAutoplay} />
                                    )}
                                </span>
                            </button>
                        ))}
                    </div>
                    <button type="button" className={styles.autoplayToggle}
                        aria-label={t(autoplayRequested ? "pauseAutoplay" : "playAutoplay")}
                        aria-pressed={!autoplayRequested} disabled={!canAutoplay}
                        onClick={() => setAutoplayRequested(current => !current)}>
                        {autoplayRequested ? (
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M8.5 6.5v11M15.5 6.5v11" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="m9 6.5 8 5.5-8 5.5Z" />
                            </svg>
                        )}
                    </button>
                </div>
                <div className={styles.arrows}>
                    <button type="button" className={styles.arrow} disabled={active === 0}
                        onClick={() => select(active - 1)} aria-label={t("previousProject")}>
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg>
                    </button>
                    <button type="button" className={styles.arrow} disabled={active === last}
                        onClick={() => select(active + 1)} aria-label={t("nextProject")}>
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg>
                    </button>
                </div>
            </div>
            <p className={styles.srOnly} aria-live="polite" aria-atomic="true">
                {projects[active].titleKey ? t(projects[active].titleKey) : projects[active].title} — {active + 1} / {projects.length}
            </p>
        </div>
    );
}
