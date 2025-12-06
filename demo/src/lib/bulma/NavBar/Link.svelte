<script lang="ts">
    import type { HTMLAnchorAttributes } from "svelte/elements";
    import { getNavBarCtx } from "./Root.svelte";

    type Props = HTMLAnchorAttributes;

    let {
        class: cssClass,
        children,
        ...restProps
    }: Props = $props();

    const ctx = getNavBarCtx();

    function handleClick() {
        if (ctx.closeOnLinkClick) {
            ctx.menuActive = false;
        }
    }
</script>

<a class={['navbar-link', cssClass]} {...restProps} onclick={handleClick}>
    {@render children?.()}
</a>
