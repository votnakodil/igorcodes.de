import assert from "node:assert/strict";
import test from "node:test";

import { getExpandableDetailsPlan } from "../src/components/ExpandableDetails/expandableDetailsState.ts";

test("keeps a three-item experience list fully visible", () => {
    assert.deepEqual(getExpandableDetailsPlan(3), {
        expandable: false,
        previewIndex: null,
        visibleCount: 3,
    });
});

test("uses the fourth item as the fading preview when more details exist", () => {
    assert.deepEqual(getExpandableDetailsPlan(4), {
        expandable: true,
        previewIndex: 3,
        visibleCount: 3,
    });
    assert.deepEqual(getExpandableDetailsPlan(8), {
        expandable: true,
        previewIndex: 3,
        visibleCount: 3,
    });
});
