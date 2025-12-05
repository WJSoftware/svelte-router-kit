import { createRawSnippet } from "svelte";
import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-svelte";
import { init } from "./init.js";

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

    test("Should render when in browser environment.", async () => {
        const KitFallbackTester = (await import("./KitFallbackTester.test.svelte")).default;
        const testId = "evidence-01";
        const children = createRawSnippet(() => ({
            render() {
                return `<span data-testid="${testId}">Here</span>`;
            },
        }));
        const { getByTestId } = render(KitFallbackTester, { children });
        expect(getByTestId(testId).element()).toBeDefined();
    });
});
