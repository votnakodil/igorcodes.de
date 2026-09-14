import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import { IconSafariFill, IconStarFill } from "symbols-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { BrandIcon } from "@/components/Icons/BrandIcon";
import { ArrowIcon } from "@/components/Icons/ArrowIcon";
import { ShimmerText } from "@/components/ShimmerText/ShimmerText";
import { useTranslation } from "@/features/language/useTranslation";
import type { Project, ProjectLink } from "@/types/project";
import styles from "./ProjectCard.module.css";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const scrollSpring = { stiffness: 110, damping: 24, mass: .65 } as const;

function DraggableBadge({ src, alt, positionClass = "", badgeClass = "" }: {
    src: string;
    alt: string;
    positionClass?: string;
    badgeClass?: string;
}) {
    const badgeRef = useRef<HTMLDivElement>(null);
    const dragOrigin = useRef({ x: 0, y: 0 });

    const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (event.pointerType === "mouse" && event.button !== 0) return;

        event.stopPropagation();
        dragOrigin.current = { x: event.clientX, y: event.clientY };
        event.currentTarget.setPointerCapture(event.pointerId);
        event.currentTarget.dataset.dragging = "true";
    };

    const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
        const badge = badgeRef.current;
        if (!badge?.hasPointerCapture(event.pointerId)) return;

        event.stopPropagation();
        const rotateX = clamp((dragOrigin.current.y - event.clientY) * .32, -32, 32);
        const rotateY = clamp((event.clientX - dragOrigin.current.x) * .32, -32, 32);
        badge.style.transform = `perspective(720px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.035)`;
    };

    const releaseBadge = (event: ReactPointerEvent<HTMLDivElement>) => {
        const badge = badgeRef.current;
        if (!badge) return;

        event.stopPropagation();
        if (badge.hasPointerCapture(event.pointerId)) badge.releasePointerCapture(event.pointerId);
        badge.dataset.dragging = "false";
        badge.style.transform = "perspective(720px) rotateX(0deg) rotateY(0deg) scale(1)";
    };

    return (
        <div className={`${styles.showcaseCenterPosition} ${positionClass}`}>
            <div
                ref={badgeRef}
                className={`${styles.showcaseCenterBadge} ${badgeClass}`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={releaseBadge}
                onPointerCancel={releaseBadge}
            >
                <img className={styles.showcaseCenter} src={src} alt={alt} decoding="async" draggable={false} />
            </div>
        </div>
    );
}

function ProjectLinkIcon({ kind }: { kind: ProjectLink["kind"] }) {
    if (kind === "github") return <BrandIcon name="github" />;
    if (kind === "appStore") return <span className={styles.appStoreIcon} aria-hidden="true" />;
    if (kind === "article") return <span className={styles.vcIcon} aria-hidden="true" />;
    if (kind === "website") return <IconSafariFill width={18} height={18} fill="currentColor" aria-hidden="true" />;
    return null;
}

export function ProjectCard({ project }: { project: Project }) {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();
    const cardRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end end"] });
    const revealProgress = useSpring(scrollYProgress, scrollSpring);
    const kursvalutLeftY = useTransform(revealProgress, [0, 1], [-190, 0]);
    const kursvalutRightY = useTransform(revealProgress, [0, 1], [210, 0]);
    const flcPhonesX = useTransform(revealProgress, [0, 1], [-220, 0]);
    const flcPhonesY = useTransform(revealProgress, [0, 1], [42, 0]);
    const flcPhonesOpacity = useTransform(revealProgress, [0, .22, 1], [.15, .65, 1]);
    const webFromLeftX = useTransform(revealProgress, [0, 1], [-260, 0]);
    const webFromRightX = useTransform(revealProgress, [0, 1], [260, 0]);
    const webFromTopY = useTransform(revealProgress, [0, 1], [-210, 0]);
    const webMockupOpacity = useTransform(revealProgress, [0, .24, 1], [.12, .7, 1]);
    const { visual } = project;
    const isShowcase = visual.type === "showcase";
    const isCustomNumpad = project.id === "custom-numpad";
    const title = project.titleKey ? t(project.titleKey) : project.title;
    const webMotionStyle = reduceMotion || project.category !== "web"
        ? undefined
        : project.id === "livetv"
            ? { x: webFromRightX, opacity: webMockupOpacity }
            : project.id === "riksha"
                ? { y: webFromTopY, opacity: webMockupOpacity }
                : { x: webFromLeftX, opacity: webMockupOpacity };

    return (
        <article ref={cardRef} className={`${styles.card} ${isShowcase ? styles.showcaseCard : ""}`}>
            <div className={`${styles.visual} ${isShowcase ? styles.showcaseVisual : ""} ${isCustomNumpad ? styles.customNumpadVisual : ""}`}>
                {visual.type === "showcase" ? (
                    <div className={`${styles.showcase} ${visual.variant === "split" ? styles.splitShowcase : ""}`}>
                        {visual.variant === "trio" ? (
                            <>
                                <motion.img className={`${styles.showcaseSide} ${styles.showcaseLeft}`} src={visual.left} alt="" decoding="async" draggable={false}
                                    style={reduceMotion ? undefined : { y: kursvalutLeftY }} />
                                <DraggableBadge src={visual.badge} alt={title} />
                                <motion.img className={`${styles.showcaseSide} ${styles.showcaseRight}`} src={visual.right} alt="" decoding="async" draggable={false}
                                    style={reduceMotion ? undefined : { y: kursvalutRightY }} />
                            </>
                        ) : (
                            <>
                                <DraggableBadge src={visual.badge} alt={title} positionClass={styles.splitBadgePosition} badgeClass={styles.splitBadge} />
                                <motion.img className={styles.splitPhones} src={visual.right} alt="" decoding="async" draggable={false}
                                    style={reduceMotion ? undefined : { x: flcPhonesX, y: flcPhonesY, opacity: flcPhonesOpacity }} />
                            </>
                        )}
                    </div>
                ) : project.category === "web" ? (
                    <motion.div className={styles.webMockupMotion} style={webMotionStyle}>
                        <img className={`${styles.image} ${styles.webMockup}`} src={visual.source} alt={title} decoding="async" draggable={false} />
                    </motion.div>
                ) : (
                    <img className={`${styles.image} ${isCustomNumpad ? styles.customNumpadImage : ""}`} src={visual.source} alt={title} decoding="async" draggable={false} />
                )}
            </div>
            <div className={styles.content}>
                <div className={styles.copy}>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.description}>{t(project.description)}</p>
                </div>
                <div className={styles.footer}>
                    {project.rating ? (
                        <div className={styles.rating} aria-label={`${project.rating.score}, ${project.rating.count} ${t("ratings")}`}>
                            <IconStarFill width={18} height={18} fill="currentColor" aria-hidden="true" />
                            <strong>{project.rating.score}</strong>
                            <span className={styles.ratingSeparator} aria-hidden="true">·</span>
                            <span className={styles.ratingCount}>
                                {project.rating.count}
                                <span>{t("ratings")}</span>
                            </span>
                        </div>
                    ) : null}
                    <ul className={styles.technologies} aria-label={t("technologies")}>
                        {project.technologies.map(technology => <li key={technology}>{technology}</li>)}
                    </ul>
                    <div className={styles.links}>
                        {project.links.map(link => {
                            const label = link.label === "GitHub" ? link.label : t(link.label);
                            return (
                                <a key={`${link.kind}-${link.url}`} href={link.url} target="_blank" rel="noreferrer" aria-label={`${label} — ${title}`}>
                                    <ProjectLinkIcon kind={link.kind} />
                                    {link.kind === "article" ? <ShimmerText cadence="relaxed">{label}</ShimmerText> : label}
                                    <ArrowIcon />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </article>
    );
}
