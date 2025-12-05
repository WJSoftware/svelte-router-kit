import { describe, expect, test } from "vitest";

describe("index", () => {
    test("Should export the exact list of expected objects.", async () => {
        const expectedExports = [
            "init",
            "KitFallback",
            "kitCalculateHref"
        ];
        const actualExports = await import("./index.js");
        for (let item of expectedExports) {
            expect(item in actualExports, `The expected object ${item} is not exported.`).toEqual(true);
        }
        for (let key of Object.keys(actualExports)) {
            expect(expectedExports.includes(key), `The library exports object ${key}, which is not expected.`).toEqual(true);
        }
    });
});
