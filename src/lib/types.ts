import "@svelte-router/core";
import { goto } from "$app/navigation";
import type { Hash, PreserveQuery, InitOptions, State, GoToOptions } from "@svelte-router/core";
import type { calculateHref } from "@svelte-router/core/kernel";

/**
 * Options available to the `Location.kitGoTo` method.
 */
export type KitGotoOptions = Omit<Parameters<typeof goto>[1], 'state'> & Pick<GoToOptions, 'state' | 'preserveQuery'>;

/**
 * Options available to the `Location.kitNavigate` method.
 */
export type KitNavigationOptions = Omit<KitGotoOptions, 'state'> & {
    /**
     * The state data to associate with the new URL and hash value.
     */
    state?: App.PageState;
    /**
     * The hash value that determines the routing universe in which navigation will take place.
     */
    hash?: Exclude<Hash, false>;
};

declare module "@svelte-router/core" {
    export interface Location {
        /**
         * Navigates to the specified href using SvelteKit's `goto` function.  This function, just like 
         * `@svelte-router/core`'s `Location.navigate`, will correctly place the href and state data in the correct 
         * places according to the routing universe determined by the `hash` option.
         * 
         * @param href The href to navigate to.
         * @param options Navigation options.
         * 
         * @returns The promise returned by SvelteKit's `goto` function.
         */
        kitNavigate(href: string, options?: KitNavigationOptions): Promise<void>;
        /**
         * Navigates to the specified href using SvelteKit's `goto` function.  This function, just like 
         * `@svelte-router/core`'s `Location.goTo`, will not make any calculations regarding routing universes.
         * 
         * @param href The href to navigate to.
         * @param options Navigation options.
         * 
         * @returns The promise returned by SvelteKit's `goto` function.
         */
        kitGoTo(href: string, options?: KitGotoOptions): Promise<void>;
    }
}

/**
 * Options available to the `init` function.
 */
export type KitInitOptions = Omit<InitOptions, 'defaultHash'> & {
    defaultHash?: Exclude<Hash, false>;
};

export type KitHash = Exclude<Hash, false>;

export type KitCalculateHrefOptions = Omit<Parameters<typeof calculateHref>[0], 'hash'>;
