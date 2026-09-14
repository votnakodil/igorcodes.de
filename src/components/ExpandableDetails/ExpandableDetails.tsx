import { useId, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";

import { EmphasisText } from "@/components/EmphasisText/EmphasisText";

import { getExpandableDetailsPlan } from "./expandableDetailsState";
import styles from "./ExpandableDetails.module.css";

type ExpandableDetailsProps = {
    items: string[];
    showLabel: string;
    collapseLabel: string;
};

type DetailsMetrics = {
    collapsedHeight: number;
    fullHeight: number;
    previewHeight: number;
};

const emptyMetrics: DetailsMetrics = {
    collapsedHeight: 0,
    fullHeight: 0,
    previewHeight: 0,
};

export function ExpandableDetails({ items, showLabel, collapseLabel }: ExpandableDetailsProps) {
    const listId = useId();
    const listRef = useRef<HTMLUListElement>(null);
    const reduceMotion = useReducedMotion();
    const [expanded, setExpanded] = useState(false);
    const [metrics, setMetrics] = useState<DetailsMetrics>(emptyMetrics);
    const plan = getExpandableDetailsPlan(items.length);

    useLayoutEffect(() => {
        const list = listRef.current;
        const previewIndex = plan.previewIndex;
        if (!list || !plan.expandable || previewIndex === null) return;

        const measure = () => {
            const previewItem = list.children[previewIndex] as HTMLElement | undefined;
            if (!previewItem) return;

            const lineHeight = Number.parseFloat(window.getComputedStyle(previewItem).lineHeight) || 27;
            const previewHeight = Math.min(previewItem.offsetHeight, Math.max(70, lineHeight * 2.35));
            const nextMetrics = {
                collapsedHeight: previewItem.offsetTop + previewHeight,
                fullHeight: list.scrollHeight,
                previewHeight,
            };

            setMetrics(current => (
                current.collapsedHeight === nextMetrics.collapsedHeight
                && current.fullHeight === nextMetrics.fullHeight
                && current.previewHeight === nextMetrics.previewHeight
                    ? current
                    : nextMetrics
            ));
        };

        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(list);
        return () => observer.disconnect();
    }, [items, plan.expandable, plan.previewIndex]);

    const list = (
        <ul className={styles.details} id={listId} ref={listRef}>
            {items.map((item, index) => (
                <li key={item} aria-hidden={!expanded && plan.previewIndex !== null && index > plan.previewIndex}>
                    <EmphasisText text={item} />
                </li>
            ))}
        </ul>
    );

    if (!plan.expandable) return list;

    const animatedHeight = metrics.fullHeight === 0
        ? "auto"
        : expanded
            ? metrics.fullHeight + 58
            : metrics.collapsedHeight;
    const frameStyle = {
        "--details-preview-height": `${metrics.previewHeight}px`,
    } as CSSProperties;

    return (
        <motion.div
            className={styles.frame}
            style={frameStyle}
            initial={false}
            animate={{ height: animatedHeight }}
            transition={reduceMotion ? { duration: 0 } : { type: "tween", duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            data-expanded={expanded || undefined}
        >
            {list}
            <div className={styles.scrim}>
                <motion.span
                    className={styles.gradient}
                    initial={false}
                    animate={{ opacity: expanded ? 0 : 1 }}
                    transition={{ duration: reduceMotion ? 0 : 0.22 }}
                    aria-hidden="true"
                />
                <motion.button
                    type="button"
                    className={styles.toggle}
                    aria-expanded={expanded}
                    aria-controls={listId}
                    aria-label={expanded ? collapseLabel : showLabel}
                    onClick={() => setExpanded(current => !current)}
                >
                    <span
                        className={styles.arrow}
                        aria-hidden="true"
                    >
                        <span
                            className={styles.arrowMotion}
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                                focusable="false"
                            >
                                <path d="M12 4v16m-6-6 6 6 6-6" />
                            </svg>
                        </span>
                    </span>
                </motion.button>
            </div>
        </motion.div>
    );
}
