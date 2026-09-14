export const liquidPopoverMorph = {
    shape: true,
    bounce: 0,
    contentBlur: 0,
    advanced: {
        evolve: {
            massStiffness: 500,
            massDamping: 44,
            sizeStiffness: 480,
            sizeDamping: 44,
            radiusStiffness: 1500,
            radiusDamping: 92,
            cornerDuration: 105,
            cornerEase: "cubic-bezier(.2,.9,.3,1)",
            anticipation: 0,
            travel: 0,
        },
    },
} as const;

export const liquidPopoverItemTransition = {
    duration: 270,
    ease: "cubic-bezier(.22,1,.36,1)",
} as const;

export const liquidPopoverPanelTransition = {
    x: { type: "spring", stiffness: 500, damping: 44, mass: 1 },
    y: { type: "spring", stiffness: 500, damping: 44, mass: 1 },
    width: { type: "spring", stiffness: 480, damping: 44, mass: 1 },
    height: { type: "spring", stiffness: 480, damping: 44, mass: 1 },
    borderRadius: { duration: 0.1, ease: [0.2, 0.9, 0.3, 1] },
} as const;

export const liquidPopoverExitTransition = {
    duration: 0.48,
    ease: [0.22, 1, 0.36, 1],
} as const;

export const liquidPopoverContentTransition = {
    duration: 0.18,
    delay: 0.3,
} as const;

export const liquidPopoverContentExit = {
    opacity: 0,
    transition: { duration: 0.08 },
} as const;
