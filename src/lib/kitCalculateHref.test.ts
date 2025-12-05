import { describe, expect, test, vi } from "vitest";
import { calculateHref } from "@svelte-router/core/kernel";
import { kitCalculateHref } from "./kitCalculateHref.js";

vi.mock(import("@svelte-router/core/kernel"), async (importActual) => {
    const actual = await importActual();
    return {
        ...actual,
        calculateHref: vi.fn(),
    };
});

describe("kitCalculateHref", () => {
    test("Should call calculateHref with hash set to false.", () => {
        kitCalculateHref({}, "/p1");
        expect(calculateHref).toHaveBeenCalledWith({ hash: false }, "/p1");
    });
    test("Should pass through other options and  the HREFs.", () => {
        kitCalculateHref({ preserveQuery: true, preserveHash: true }, "/p1", "/p2");
        expect(calculateHref).toHaveBeenCalledWith(
            { preserveQuery: true, preserveHash: true, hash: false },
            "/p1",
            "/p2"
        );
    });
});
