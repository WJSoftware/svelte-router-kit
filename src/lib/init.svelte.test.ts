import { describe, test, expect, vi, afterEach } from "vitest";
import { init } from "./init.js";
import { initCore } from "@svelte-router/core/kernel";
import { KitLocation } from "./KitLocation.js";
import type { KitInitOptions } from "./types.js";

vi.mock(import("@svelte-router/core/kernel"), async (importActual) => {
    return {
        ...(await importActual()),
        initCore: vi.fn(),
    };
});

vi.mock(import("$app/navigation"), async (importActual) => {
    return {
        ...(await importActual()),
        goto: vi.fn(),
    };
});

describe("init", () => {
    afterEach(() => {
        vi.resetAllMocks();
    });
    
    test("Should call initCore with defaultHash set to true by default.", () => {
        init();
        expect(initCore).toHaveBeenCalledWith(expect.any(KitLocation), expect.objectContaining({
            defaultHash: true,
        }));
    });
    test("Should call initCore disallowing path routing.", () => {
        init();
        expect(initCore).toHaveBeenCalledWith(expect.any(KitLocation), expect.objectContaining({
            disallowPathRouting: true,
        }));
    });
    test("Should forward options to initCore.", () => {
        const options: KitInitOptions = {
            hashMode: 'multi',
            logger: true,
            trace: {
                routerHierarchy: true,
            }
        };
        init(options);
        expect(initCore).toHaveBeenCalledWith(expect.any(KitLocation), expect.objectContaining({
            ...options,
            disallowPathRouting: true,
        }));
    });
    test("Should respect any defaultHash option provided by the user.", () => {
        const options: KitInitOptions = {
            defaultHash: 'abc',
        };
        init(options);
        expect(initCore).toHaveBeenCalledWith(expect.any(KitLocation), expect.objectContaining({
            defaultHash: 'abc',
            disallowPathRouting: true,
        }));
    });
    test("Should throw an error if defaultHash is set to false.", () => {
        const options: KitInitOptions = {
            // @ts-expect-error TS2367 -- Fully expected, as typing has removed false as a valid value.
            defaultHash: false,
        };
        expect(() => init(options)).toThrowError();
    });
    test("Should return the cleanup function from initCore.", () => {
        const cleanupFn = vi.fn();
        vi.mocked(initCore).mockReturnValueOnce(cleanupFn);
        const r = init();
        expect(r).toBe(cleanupFn);
    });
});
