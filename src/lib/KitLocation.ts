import { goto } from "$app/navigation";
import { calculateHref, calculateState, LocationLite, preserveQueryInUrl } from "@svelte-router/core/kernel";
import type { Location } from "@svelte-router/core";
import type { KitGotoOptions, KitNavigationOptions } from "./types.js";
import { KitHistoryApi } from "./KitHistoryApi.js";

export class KitLocation extends LocationLite implements Location {
    constructor() {
        super(new KitHistoryApi());
    }
    kitGoTo(href: string, options?: KitGotoOptions): Promise<void> {
        if (options?.preserveQuery && href !== '') {
            href = preserveQueryInUrl(href, options.preserveQuery);
        }
        return goto(href, options);
    }
    kitNavigate(href: string, options?: KitNavigationOptions): Promise<void> {
        if (href !== '') {
            href = calculateHref({
                hash: options?.hash,
                preserveQuery: options?.preserveQuery,
            }, href);
        }
        return goto(href, {
            ...options,
            state: calculateState(options?.hash, options?.state)
        });
    }
}
