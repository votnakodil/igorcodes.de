import assert from "node:assert/strict";
import test from "node:test";

import {
    getProjectOpenGoal,
    trackGoal,
    trackPageView,
    YANDEX_METRIKA_COUNTER_ID,
} from "../src/features/analytics/yandexMetrika.ts";

test("analytics helpers are safe before the Metrika function exists", () => {
    const previousWindow = globalThis.window;
    globalThis.window = {};

    assert.doesNotThrow(() => trackGoal("settings_open"));
    assert.doesNotThrow(() => trackPageView("https://igorcodes.de/"));

    globalThis.window = previousWindow;
});

test("analytics helpers send typed goals and page views through the configured counter", () => {
    const calls = [];
    const previousWindow = globalThis.window;
    globalThis.window = { ym: (...args) => calls.push(args) };

    trackGoal("contact_email");
    trackPageView("https://igorcodes.de/#contact");

    assert.deepEqual(calls, [
        [YANDEX_METRIKA_COUNTER_ID, "reachGoal", "contact_email"],
        [YANDEX_METRIKA_COUNTER_ID, "hit", "https://igorcodes.de/#contact"],
    ]);

    globalThis.window = previousWindow;
});

test("project goal mapping includes every project with a configured Metrika goal", () => {
    assert.equal(getProjectOpenGoal("kursvalut"), "project_open_kursvalut");
    assert.equal(getProjectOpenGoal("flc-calculator"), "project_open_flc_calculator");
    assert.equal(getProjectOpenGoal("nft"), "project_open_nft");
    assert.equal(getProjectOpenGoal("livetv"), "project_open_livetv");
    assert.equal(getProjectOpenGoal("riksha"), "project_open_riksha");
    assert.equal(getProjectOpenGoal("pages"), "project_open_pages");
    assert.equal(getProjectOpenGoal("custom-numpad"), "project_open_custom_numpad");
});
