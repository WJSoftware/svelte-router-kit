<script lang="ts">
    import type { HTMLButtonAttributes } from "svelte/elements";
    import { getNavBarCtx } from "./Root.svelte";

    type Props = Omit<HTMLButtonAttributes, 'children'> & {
        lineCount?: number;
    };

    let {
        lineCount = 4,
        class: cssClass,
        ...restProps
    }: Props = $props();

    const ctx = getNavBarCtx();

    function toggleNavBarContent() {
        ctx.menuActive = !ctx.menuActive;
    }
</script>

<button
    class={["navbar-burger", cssClass, { 'is-active': ctx.menuActive }]}
    {...restProps}
    aria-label="menu"
    aria-expanded="false"
    onclick={toggleNavBarContent}
>
    {#each { length: lineCount } as _, i}
        <span aria-hidden="true"></span>
    {/each}
</button>
