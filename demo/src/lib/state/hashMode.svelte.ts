import { page } from "$app/state";
import { createSubscriber } from "svelte/reactivity";

export class HashMode {
    #isMultiHash = $state(false);
    #subscribe;
    constructor() {
        this.#subscribe = createSubscriber(() => {
            $effect(() => {
                this.#isMultiHash = page.url.searchParams.has('multi');
            });
        });
    }

    get isMultiHash() {
        this.#subscribe();
        return this.#isMultiHash;
    }
}

export default new HashMode();
