export const DEFAULT_VISIBLE_DETAILS = 3;

export function getExpandableDetailsPlan(itemCount: number, visibleCount = DEFAULT_VISIBLE_DETAILS) {
    const expandable = itemCount > visibleCount;

    return {
        expandable,
        previewIndex: expandable ? visibleCount : null,
        visibleCount: Math.min(itemCount, visibleCount),
    };
}
