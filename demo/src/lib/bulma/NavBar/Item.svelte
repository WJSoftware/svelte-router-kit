<script lang="ts" generics="T extends 'a' | 'div' = 'div'">
    import type { HTMLAttributes, HTMLAnchorAttributes } from 'svelte/elements';
    import { getNavBarCtx } from './Root.svelte';

    type Props = (T extends 'a' ? HTMLAnchorAttributes : HTMLAttributes<HTMLDivElement>) & {
        tag?: T;
        isActive?: boolean;
        isTab?: boolean;
    };

    const ctx = getNavBarCtx();

    let { tag = 'div' as T, isActive, isTab, class: cssClass, children, ...restProps }: Props = $props();

    function handleClick() {
        if (tag === 'a') {
            if (ctx.closeOnLinkClick) {
                ctx.menuActive = !ctx.menuActive;
            }
        }
    }
</script>

<svelte:element
    this={tag}
    class={['navbar-item', cssClass, { 'is-active': isActive, 'is-tab': isTab }]}
    onclick={handleClick}
    {...restProps}
>
    {@render children?.()}
</svelte:element>
