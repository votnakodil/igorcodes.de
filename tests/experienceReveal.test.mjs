import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const experienceSource = await readFile(new URL("../src/sections/Experience/Experience.tsx", import.meta.url), "utf8");

test("experience entries use the same scroll reveal motion as the other sections", () => {
    assert.match(experienceSource, /<motion\.article[\s\S]*initial=\{reduceMotion \? false : \{ opacity: 0, y: 20 \}\}/);
    assert.match(experienceSource, /<motion\.article[\s\S]*whileInView=\{\{ opacity: 1, y: 0 \}\}/);
    assert.match(experienceSource, /<motion\.article[\s\S]*transition=\{reduceMotion \? \{ duration: 0 \} : revealSpring\}/);
});
