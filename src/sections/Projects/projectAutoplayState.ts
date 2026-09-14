export interface ProjectAutoplayState {
    activeIndex: number;
    lastIndex: number;
    progressCycle: number;
}

export function completeAutoplayCycle(state: ProjectAutoplayState) {
    return {
        activeIndex: state.activeIndex === state.lastIndex ? 0 : state.activeIndex + 1,
        progressCycle: state.progressCycle + 1,
    };
}
