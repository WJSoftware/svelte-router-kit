<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { getNavBarCtx } from './Root.svelte';
    import { slide } from 'svelte/transition';

    type Props = HTMLAttributes<HTMLDivElement> & {
        end?: Snippet;
    };

    let { class: cssClass, end, children, ...restProps }: Props = $props();

    const ctx = getNavBarCtx();
</script>

{#key ctx.menuActive}
    <div
        class={['navbar-menu', cssClass, { 'is-active': ctx.menuActive }]}
        {...restProps}
        transition:slide={{ duration: 200 }}
    >
        <div class="navbar-start">
            {@render children?.()}
        </div>
        {#if end}
            <div class="navbar-end">
                {@render end()}
            </div>
        {/if}
    </div>
{/key}
