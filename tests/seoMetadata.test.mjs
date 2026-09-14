import assert from "node:assert/strict";
import test from "node:test";

import { getSeoMetadata } from "../src/features/seo/seoMetadata.ts";

test("provides complete English social metadata", () => {
    assert.deepEqual(getSeoMetadata("en"), {
        title: "Igor Volkov — Developer",
        description: "Personal website and portfolio of Igor Volkov, a developer creating mobile and web experiences.",
        locale: "en_US",
    });
});

test("provides complete Russian social metadata", () => {
    assert.deepEqual(getSeoMetadata("ru"), {
        title: "Игорь Волков — Разработчик",
        description: "Личный сайт и портфолио Игоря Волкова — разработчика мобильных и веб-продуктов.",
        locale: "ru_RU",
    });
});
