import assert from "node:assert/strict";
import test from "node:test";

import {
    getResumePanelPreferredTop,
    getResumePanelSize,
    getResumeSurfaceOrigin,
} from "../src/components/ResumeDownload/resumePopoverLayout.ts";

test("uses compact panel dimensions on mobile viewports", () => {
    assert.deepEqual(getResumePanelSize(390, 844), { width: 320, height: 410, mobile: true });
    assert.deepEqual(getResumePanelSize(319, 562), { width: 287, height: 410, mobile: true });
    assert.deepEqual(getResumePanelSize(390, 844, true), { width: 320, height: 430, mobile: true });
    assert.deepEqual(getResumePanelSize(390, 844, false, "en"), { width: 320, height: 381, mobile: true });
    assert.deepEqual(getResumePanelSize(390, 844, true, "en"), { width: 320, height: 401, mobile: true });
});

test("keeps desktop panel dimensions unchanged", () => {
    assert.deepEqual(getResumePanelSize(1440, 900), { width: 520, height: 532, mobile: false });
});

test("anchors the liquid surface to the document at the current scroll position", () => {
    assert.deepEqual(getResumeSurfaceOrigin(0, 0), { left: 0, top: 0 });
    assert.deepEqual(getResumeSurfaceOrigin(24, 1840), { left: 24, top: 1840 });
});

test("keeps the mobile panel near the download button", () => {
    assert.equal(getResumePanelPreferredTop("below", true, 100, 48, 381, 844), 166);
    assert.equal(getResumePanelPreferredTop("below", true, 700, 48, 381, 844), 301);
    assert.equal(getResumePanelPreferredTop("below", true, 760, 48, 381, 844), 361);
    assert.equal(getResumePanelPreferredTop("below", true, 835, 48, 381, 956), 436);
    assert.equal(getResumePanelPreferredTop("below", true, 240, 48, 410, 500), 78);
    assert.equal(getResumePanelPreferredTop("below", false, 360), 12);
    assert.equal(getResumePanelPreferredTop("right", false, 360), 288);
});
