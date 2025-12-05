import { createRawSnippet } from "svelte";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import { render } from "svelte/server";
import { init } from "../init.js";

// @ts-expect-error Not all properties are mocked.
vi.mock(import("$app/state"), () => {
    return {
        page: {
            url: new URL("http://localhost/"),
            state: { path: "/", hash: {} },
        },
    };
});

describe("KitFallback", () => {
    let cleanup: () => void;
    beforeAll(() => {
        cleanup = init();
    });
    afterAll(() => {
        cleanup();
    });

    test("Should not render when not in browser environment.", async () => {
        const KitFallbackTester = (await import("./KitFallbackTester.test.svelte")).default;
        const testId = "evidence-01";
        const children = createRawSnippet(() => ({
            render() {
                return `<span data-testid="${testId}">Here</span>`;
            },
        }));
        const c = render(KitFallbackTester, { props: { children } });
        expect(c.body).not.toContain(testId);
    });
});
