const DESKTOP_PANEL_MAX_WIDTH = 520;
const DESKTOP_PANEL_MAX_HEIGHT = 532;
const MOBILE_PANEL_MAX_WIDTH = 320;
const MOBILE_PANEL_MAX_HEIGHT = 420;
const DESKTOP_VIEWPORT_PADDING = 12;
const MOBILE_VIEWPORT_PADDING = 16;

export const RESUME_PANEL_MOBILE_BREAKPOINT = 520;

export type ResumePanelSize = {
    width: number;
    height: number;
    mobile: boolean;
};

export function getResumePanelSize(viewportWidth: number, viewportHeight: number): ResumePanelSize {
    const mobile = viewportWidth <= RESUME_PANEL_MOBILE_BREAKPOINT;
    const horizontalPadding = mobile ? MOBILE_VIEWPORT_PADDING * 2 : DESKTOP_VIEWPORT_PADDING * 2;

    return {
        width: Math.min(
            mobile ? MOBILE_PANEL_MAX_WIDTH : DESKTOP_PANEL_MAX_WIDTH,
            Math.max(0, viewportWidth - horizontalPadding),
        ),
        height: Math.min(
            mobile ? MOBILE_PANEL_MAX_HEIGHT : DESKTOP_PANEL_MAX_HEIGHT,
            Math.max(0, viewportHeight - DESKTOP_VIEWPORT_PADDING * 2),
        ),
        mobile,
    };
}

export function getResumeSurfaceOrigin(scrollX: number, scrollY: number) {
    return { left: scrollX, top: scrollY };
}

export function getResumePanelPreferredTop(side: "right" | "below", mobile: boolean, buttonTop: number) {
    if (side === "right") return buttonTop - 72;
    return mobile ? 60 : DESKTOP_VIEWPORT_PADDING;
}
