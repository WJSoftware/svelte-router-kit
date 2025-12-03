import { initCore } from "@svelte-router/core/kernel";
import { KitLocation } from "./KitLocation.js";
import type { KitInitOptions } from "./types.js";
import { browser } from "$app/environment";

let cleanupFn: (() => void) | undefined = undefined;

export function init(options?: KitInitOptions) {
    // @ts-expect-error TS2367 -- Fully expected, as typing has removed false as a valid value.
    if (options?.defaultHash === false) {
        throw new Error("SvelteKit routing requires hash mode. Setting defaultHash to false is not allowed.");
    }
    if (!browser) {
        cleanupFn?.();
    }
    cleanupFn = initCore(new KitLocation(), {
        defaultHash: true,
        ...options,
        disallowPathRouting: true,
    });
    return cleanupFn;
}
