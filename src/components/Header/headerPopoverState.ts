export type HeaderPopover = "menu" | "settings" | null;

export function nextHeaderPopover(current: HeaderPopover, requested: Exclude<HeaderPopover, null>): HeaderPopover {
    return current === requested ? null : requested;
}
