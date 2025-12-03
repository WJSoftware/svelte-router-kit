<script lang="ts">
    import type { Snippet } from 'svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import type { IsColor, IsSize } from './common';

    export interface BulmaButtonProps {
        isColor?: IsColor;
        isSize?: IsSize;
        outlined?: boolean;
        children?: Snippet;
    };

    type Props = BulmaButtonProps & {
        tag: 'a' | 'button';
        [x: string]: any;
    };

    let { tag, type = 'button', isColor, isSize, outlined, children, class: cssClass, ...restProps }: Props = $props();
</script>

<svelte:element
    this={tag}
    class={['button', cssClass, isColor, isSize, { 'is-outlined': outlined }]}
    {...restProps}
>
    {@render children?.()}
</svelte:element>
