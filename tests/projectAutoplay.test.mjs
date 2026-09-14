import assert from "node:assert/strict";
import test from "node:test";

import { completeAutoplayCycle } from "../src/sections/Projects/projectAutoplayState.ts";

test("a completed progress cycle always advances to the next project", () => {
    assert.deepEqual(
        completeAutoplayCycle({ activeIndex: 0, lastIndex: 2, progressCycle: 4 }),
        { activeIndex: 1, progressCycle: 5 },
    );
});

test("a completed progress cycle wraps from the last project to the first", () => {
    assert.deepEqual(
        completeAutoplayCycle({ activeIndex: 2, lastIndex: 2, progressCycle: 7 }),
        { activeIndex: 0, progressCycle: 8 },
    );
});
