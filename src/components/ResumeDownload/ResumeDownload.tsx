import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Liquid } from "liquid-gooey";

import { ArrowIcon } from "@/components/Icons/ArrowIcon";
import { useTranslation } from "@/features/language/useTranslation";
import { trackGoal } from "@/features/analytics/yandexMetrika";
import {
    liquidPopoverContentExit,
    liquidPopoverContentTransition,
    liquidPopoverItemTransition,
    liquidPopoverMorph,
    liquidPopoverPanelTransition,
} from "@/motion/liquidPopover";

import {
    getResumePanelPreferredTop,
    getResumePanelSize,
    getResumeSurfaceOrigin,
} from "./resumePopoverLayout";
import styles from "./ResumeDownload.module.css";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const PANEL_GAP = 18;
const VIEWPORT_PADDING = 12;
const MOBILE_DROP_SIZE = 18;

type PlacementSide = "right" | "below";

type PopoverGeometry = {
    surfaceLeft: number;
    surfaceTop: number;
    buttonLeft: number;
    buttonTop: number;
    buttonWidth: number;
    buttonHeight: number;
    panelLeft: number;
    panelTop: number;
    panelWidth: number;
    panelHeight: number;
    side: PlacementSide;
};

const initialGeometry: PopoverGeometry = {
    surfaceLeft: 0,
    surfaceTop: 0,
    buttonLeft: 0,
    buttonTop: 0,
    buttonWidth: 220,
    buttonHeight: 48,
    panelLeft: 238,
    panelTop: 12,
    panelWidth: 520,
    panelHeight: 532,
    side: "right",
};

function makeCode() {
    const values = new Uint32Array(5);
    crypto.getRandomValues(values);
    return Array.from(values, value => ALPHABET[value % ALPHABET.length]).join("");
}

function geometryEquals(left: PopoverGeometry, right: PopoverGeometry) {
    return Object.keys(left).every(key => left[key as keyof PopoverGeometry] === right[key as keyof PopoverGeometry]);
}

export function ResumeDownload() {
    const { t } = useTranslation();
    const reduceMotion = useReducedMotion();
    const buttonSpring = reduceMotion
        ? { duration: 0 }
        : { type: "spring" as const, stiffness: 430, damping: 31, mass: 0.72 };
    const buttonRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [panelMounted, setPanelMounted] = useState(false);
    const [geometry, setGeometry] = useState<PopoverGeometry>(initialGeometry);
    const [code, setCode] = useState(makeCode);
    const [value, setValue] = useState("");
    const [error, setError] = useState(false);

    const refresh = useCallback(() => {
        setCode(makeCode());
        setValue("");
        setError(false);
    }, []);

    const updateGeometry = useCallback(() => {
        const button = buttonRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const surfaceOrigin = getResumeSurfaceOrigin(window.scrollX, window.scrollY);
        const panelSize = getResumePanelSize(window.innerWidth, window.innerHeight);
        const { width: panelWidth, height: panelHeight, mobile } = panelSize;
        const fitsRight = window.innerWidth - rect.right >= panelWidth + PANEL_GAP + VIEWPORT_PADDING;
        const side: PlacementSide = fitsRight ? "right" : "below";
        const panelLeft = fitsRight
            ? rect.right + PANEL_GAP
            : mobile
                ? Math.max(VIEWPORT_PADDING, (window.innerWidth - panelWidth) / 2)
                : Math.max(VIEWPORT_PADDING, Math.min(rect.left, window.innerWidth - panelWidth - VIEWPORT_PADDING));
        const preferredTop = getResumePanelPreferredTop(side, mobile, rect.top);
        const panelTop = Math.max(
            VIEWPORT_PADDING,
            Math.min(preferredTop, window.innerHeight - panelHeight - VIEWPORT_PADDING),
        );
        const nextGeometry: PopoverGeometry = {
            surfaceLeft: surfaceOrigin.left,
            surfaceTop: surfaceOrigin.top,
            buttonLeft: rect.left,
            buttonTop: rect.top,
            buttonWidth: rect.width,
            buttonHeight: rect.height,
            panelLeft,
            panelTop,
            panelWidth,
            panelHeight,
            side,
        };

        setGeometry(current => geometryEquals(current, nextGeometry) ? current : nextGeometry);
    }, []);

    useLayoutEffect(() => {
        updateGeometry();
        window.addEventListener("resize", updateGeometry);
        return () => window.removeEventListener("resize", updateGeometry);
    }, [updateGeometry]);

    useEffect(() => {
        if (!open) return;

        updateGeometry();
        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target as Node;
            if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) setOpen(false);
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };
        const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 320);

        window.addEventListener("pointerdown", handlePointerDown);
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.clearTimeout(focusTimer);
            window.removeEventListener("pointerdown", handlePointerDown);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, updateGeometry]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !open) return;
        const context = canvas.getContext("2d");
        if (!context) return;

        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = 520 * ratio;
        canvas.height = 160 * ratio;
        context.scale(ratio, ratio);
        context.fillStyle = "rgba(0, 38, 94, .24)";
        context.fillRect(0, 0, 520, 160);
        context.strokeStyle = "rgba(255,255,255,.3)";
        context.lineWidth = 1.5;
        for (let line = 0; line < 7; line += 1) {
            context.beginPath();
            context.moveTo(-20, 20 + line * 21);
            context.bezierCurveTo(140, 5 + line * 19, 350, 55 + line * 8, 550, 12 + line * 22);
            context.stroke();
        }
        context.fillStyle = "#ffffff";
        context.font = "600 54px -apple-system, BlinkMacSystemFont, sans-serif";
        context.textAlign = "center";
        context.textBaseline = "middle";
        [...code].forEach((character, index) => {
            context.save();
            context.translate(124 + index * 68, 80);
            context.rotate(((index % 3) - 1) * .07);
            context.fillText(character, 0, 0);
            context.restore();
        });
    }, [code, open]);

    const show = () => {
        trackGoal("resume_download_open");
        refresh();
        updateGeometry();
        setPanelMounted(true);
        setOpen(true);
    };

    const submit = (event: FormEvent) => {
        event.preventDefault();
        if (value.trim().toUpperCase() !== code) {
            setError(true);
            setValue("");
            inputRef.current?.focus();
            return;
        }

        trackGoal("resume_captcha_success");
        const link = document.createElement("a");
        link.href = "/docs/CV.pdf";
        link.download = "Igor-Volkov-CV.pdf";
        document.body.appendChild(link);
        trackGoal("resume_download");
        link.click();
        link.remove();
        setOpen(false);
    };

    const dropOrigin = geometry.side === "right"
        ? {
            width: geometry.buttonHeight,
            height: geometry.buttonHeight,
            x: geometry.buttonLeft + geometry.buttonWidth - geometry.buttonHeight,
            y: geometry.buttonTop,
            borderRadius: 999,
        }
        : {
            width: MOBILE_DROP_SIZE,
            height: MOBILE_DROP_SIZE,
            x: geometry.buttonLeft + geometry.buttonWidth / 2 - MOBILE_DROP_SIZE / 2,
            y: geometry.buttonTop + geometry.buttonHeight - MOBILE_DROP_SIZE / 2,
            borderRadius: 999,
        };
    const panelTarget = {
        width: geometry.panelWidth,
        height: geometry.panelHeight,
        x: geometry.panelLeft,
        y: geometry.panelTop,
        borderRadius: 26,
    };
    return <>
        <span className={styles.downloadControl} data-panel-side={open ? geometry.side : undefined}>
            <motion.button
                ref={buttonRef}
                type="button"
                className={styles.downloadButton}
                onClick={open ? () => setOpen(false) : show}
                aria-expanded={open}
                aria-label={t("downloadResume")}
                initial="rest"
                animate="rest"
                whileHover="hover"
                whileFocus="hover"
            >
                <span className={styles.downloadMain}>
                    <motion.span
                        className={styles.downloadLabel}
                        variants={{ rest: { y: 0 }, hover: { y: -9 } }}
                        transition={buttonSpring}
                    >
                        {t("downloadResume")}
                    </motion.span>
                    <span className={styles.downloadArrow} aria-hidden="true"><ArrowIcon down /></span>
                </span>
                <motion.span
                    className={styles.downloadDetails}
                    aria-hidden="true"
                    variants={{
                        rest: { opacity: 0, y: 10, scale: 0.98 },
                        hover: { opacity: 0.78, y: 0, scale: 1 },
                    }}
                    transition={buttonSpring}
                >
                    {t("resumeFileDetails")}
                </motion.span>
            </motion.button>
        </span>

        {createPortal(
            <Liquid
                className={styles.resumeGoo}
                style={{ left: geometry.surfaceLeft, top: geometry.surfaceTop }}
                blur={11}
                contrast={18}
                filterPadding={128}
                fill="var(--color-button)"
            >
                {panelMounted && (
                    <Liquid.Item observe radius={999} morph={{ advanced: { blobInset: 4 } }}>
                        <span
                            className={styles.buttonShape}
                            style={{
                                left: geometry.buttonLeft,
                                top: geometry.buttonTop,
                                width: geometry.buttonWidth,
                                height: geometry.buttonHeight,
                            }}
                            aria-hidden="true"
                        />
                    </Liquid.Item>
                )}

                {panelMounted && (
                    <Liquid.Item morph={liquidPopoverMorph} transition={liquidPopoverItemTransition}>
                        <motion.div
                            ref={panelRef}
                            role="dialog"
                            aria-modal="false"
                            aria-hidden={!open}
                            aria-labelledby="resume-check-title"
                            data-side={geometry.side}
                            data-open={open || undefined}
                            className={styles.panel}
                            initial={reduceMotion ? { ...dropOrigin, opacity: 0 } : dropOrigin}
                            animate={open ? { ...panelTarget, opacity: 1 } : { ...dropOrigin, opacity: 1 }}
                            transition={reduceMotion ? { duration: 0 } : liquidPopoverPanelTransition}
                            onAnimationComplete={() => {
                                if (!open) setPanelMounted(false);
                            }}
                        >
                            <AnimatePresence>
                                {open && (
                                    <motion.div
                                        className={styles.content}
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={liquidPopoverContentExit}
                                        transition={liquidPopoverContentTransition}
                                    >
                                    <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label={t("captchaCancel")}>
                                        <svg viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5" />
                                        </svg>
                                    </button>
                                    <p className={styles.eyebrow}>{t("downloadResume")}</p>
                                    <h2 id="resume-check-title">{t("captchaTitle")}</h2>
                                    <p className={styles.description}>{t("captchaDescription")}</p>
                                    <canvas ref={canvasRef} className={styles.canvas} width="520" height="160" aria-label={t("captchaLabel")} />
                                    <button type="button" className={styles.refresh} onClick={refresh}>{t("captchaRefresh")}</button>
                                    <form onSubmit={submit} noValidate>
                                        <label htmlFor="resume-captcha">{t("captchaLabel")}</label>
                                        <input
                                            ref={inputRef}
                                            id="resume-captcha"
                                            value={value}
                                            onChange={event => {
                                                setValue(event.target.value);
                                                setError(false);
                                            }}
                                            placeholder={t("captchaPlaceholder")}
                                            autoComplete="off"
                                            spellCheck={false}
                                            maxLength={5}
                                            aria-invalid={error}
                                        />
                                        {error && <p className={styles.error} role="alert">{t("captchaError")}</p>}
                                        <div className={styles.actions}>
                                            <button type="button" className={styles.cancel} onClick={() => setOpen(false)}>{t("captchaCancel")}</button>
                                            <button type="submit" className={styles.submit}>{t("captchaSubmit")}</button>
                                        </div>
                                    </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </Liquid.Item>
                )}
            </Liquid>,
            document.body,
        )}
    </>;
}
