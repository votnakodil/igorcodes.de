import assert from "node:assert/strict";
import test from "node:test";

import { nextHeaderPopover } from "../src/components/Header/headerPopoverState.ts";

test("opening a header popover closes the other popover", () => {
    assert.equal(nextHeaderPopover("settings", "menu"), "menu");
    assert.equal(nextHeaderPopover("menu", "settings"), "settings");
});

test("pressing the active header popover button closes it", () => {
    assert.equal(nextHeaderPopover("menu", "menu"), null);
    assert.equal(nextHeaderPopover("settings", "settings"), null);
});
