import assert from "node:assert/strict";
import test from "node:test";

import { getThemeColor } from "../src/features/theme/theme.utils.ts";

test("uses the page background color for browser chrome", () => {
    assert.equal(getThemeColor("light"), "#ffffff");
    assert.equal(getThemeColor("dark"), "#000000");
});
