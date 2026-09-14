export const revealViewport = {
    once: true,
    amount: 0.18,
} as const;

export const springs = {
    reveal: {
        type: "spring" as const,
        stiffness: 105,
        damping: 22,
        mass: 1,
    },

    revealSoft: {
        type: "spring" as const,
        stiffness: 90,
        damping: 23,
        mass: 1.05,
    },

    hero: {
        type: "spring" as const,
        stiffness: 145,
        damping: 23,
        mass: 0.95,
    },

    heroVisual: {
        type: "spring" as const,
        stiffness: 115,
        damping: 21,
        mass: 1.08,
    },

    heroImage: {
        type: "spring" as const,
        stiffness: 95,
        damping: 24,
        mass: 1.12,
    },

    settingsPanel: {
        type: "spring" as const,
        stiffness: 420,
        damping: 24,
        mass: 0.82,
    },

    gearRotate: {
        type: "spring" as const,
        stiffness: 150,
        damping: 18,
        mass: 1.15,
    },

    gearScale: {
        type: "spring" as const,
        stiffness: 420,
        damping: 15,
        mass: 0.65,
    },

    segmented: {
        type: "spring" as const,
        stiffness: 500,
        damping: 34,
        mass: 0.7,
    },

    segmentedLabel: {
        type: "spring" as const,
        stiffness: 500,
        damping: 32,
    },
} as const;

export const revealSpring = springs.reveal;
export const revealSpringSoft = springs.revealSoft;
