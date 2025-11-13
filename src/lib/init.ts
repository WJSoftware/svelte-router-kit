import { initCore } from "@svelte-router/core/kernel";
import { SkLocation } from "./SkLocation.js";
import type { SkInitOptions } from "./types.js";
import { browser } from "$app/environment";

let cleanupFn: (() => void) | undefined = undefined;

export function init(options?: SkInitOptions) {
    // @ts-expect-error TS2367 -- Fully expected, as typing has removed false as a valid value.
    if (options?.defaultHash === false) {
        throw new Error("SvelteKit routing requires hash mode. Setting defaultHash to false is not allowed.");
    }
    if (!browser) {
        cleanupFn?.();
    }
    cleanupFn = initCore(new SkLocation(), {
        defaultHash: true,
        ...options,
        disallowPathRouting: true,
    });
    return cleanupFn;
}
