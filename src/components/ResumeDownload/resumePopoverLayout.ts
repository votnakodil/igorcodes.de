const DESKTOP_PANEL_MAX_WIDTH = 520;
const DESKTOP_PANEL_MAX_HEIGHT = 532;
const MOBILE_PANEL_MAX_WIDTH = 320;
const MOBILE_PANEL_MAX_HEIGHT = 381;
const MOBILE_PANEL_RUSSIAN_EXTRA_HEIGHT = 29;
const MOBILE_PANEL_ERROR_EXTRA_HEIGHT = 20;
const DESKTOP_VIEWPORT_PADDING = 12;
const MOBILE_VIEWPORT_PADDING = 16;
const PANEL_GAP = 18;

export const RESUME_PANEL_MOBILE_BREAKPOINT = 520;

export type ResumePanelSize = {
    width: number;
    height: number;
    mobile: boolean;
};

export function getResumePanelSize(
    viewportWidth: number,
    viewportHeight: number,
    hasError = false,
    language: "en" | "ru" = "ru",
): ResumePanelSize {
    const mobile = viewportWidth <= RESUME_PANEL_MOBILE_BREAKPOINT;
    const horizontalPadding = mobile ? MOBILE_VIEWPORT_PADDING * 2 : DESKTOP_VIEWPORT_PADDING * 2;
    const languageExtraHeight = language === "ru" ? MOBILE_PANEL_RUSSIAN_EXTRA_HEIGHT : 0;
    const mobilePanelHeight = MOBILE_PANEL_MAX_HEIGHT
        + languageExtraHeight
        + (hasError ? MOBILE_PANEL_ERROR_EXTRA_HEIGHT : 0);

    return {
        width: Math.min(
            mobile ? MOBILE_PANEL_MAX_WIDTH : DESKTOP_PANEL_MAX_WIDTH,
            Math.max(0, viewportWidth - horizontalPadding),
        ),
        height: Math.min(
            mobile ? mobilePanelHeight : DESKTOP_PANEL_MAX_HEIGHT,
            Math.max(0, viewportHeight - DESKTOP_VIEWPORT_PADDING * 2),
        ),
        mobile,
    };
}

export function getResumeSurfaceOrigin(scrollX: number, scrollY: number) {
    return { left: scrollX, top: scrollY };
}

export function getResumePanelPreferredTop(
    side: "right" | "below",
    mobile: boolean,
    buttonTop: number,
    buttonHeight = 48,
    panelHeight = DESKTOP_PANEL_MAX_HEIGHT,
    viewportHeight = 900,
) {
    if (side === "right") return buttonTop - 72;
    if (!mobile) return DESKTOP_VIEWPORT_PADDING;

    const minTop = DESKTOP_VIEWPORT_PADDING;
    const maxTop = Math.max(minTop, viewportHeight - panelHeight - DESKTOP_VIEWPORT_PADDING);
    const belowTop = buttonTop + buttonHeight + PANEL_GAP;
    const aboveTop = buttonTop - panelHeight - PANEL_GAP;

    if (belowTop <= maxTop) return belowTop;
    if (aboveTop >= minTop) return aboveTop;
    return Math.max(minTop, Math.min(belowTop, maxTop));
}
