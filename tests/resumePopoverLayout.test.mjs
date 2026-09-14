import assert from "node:assert/strict";
import test from "node:test";

import {
    getResumePanelPreferredTop,
    getResumePanelSize,
    getResumeSurfaceOrigin,
} from "../src/components/ResumeDownload/resumePopoverLayout.ts";

test("uses compact panel dimensions on mobile viewports", () => {
    assert.deepEqual(getResumePanelSize(390, 844), { width: 320, height: 420, mobile: true });
    assert.deepEqual(getResumePanelSize(319, 562), { width: 287, height: 420, mobile: true });
});

test("keeps desktop panel dimensions unchanged", () => {
    assert.deepEqual(getResumePanelSize(1440, 900), { width: 520, height: 532, mobile: false });
});

test("anchors the liquid surface to the document at the current scroll position", () => {
    assert.deepEqual(getResumeSurfaceOrigin(0, 0), { left: 0, top: 0 });
    assert.deepEqual(getResumeSurfaceOrigin(24, 1840), { left: 24, top: 1840 });
});

test("places the compact panel below the sticky mobile header", () => {
    assert.equal(getResumePanelPreferredTop("below", true, 360), 60);
    assert.equal(getResumePanelPreferredTop("below", false, 360), 12);
    assert.equal(getResumePanelPreferredTop("right", false, 360), 288);
});
