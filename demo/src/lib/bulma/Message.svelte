<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import type { IsColor } from "./common";
    import type { Snippet } from "svelte";

    type Props = HTMLAttributes<HTMLElement> & {
        tag?: string;
        isColor?: IsColor;
        children?: Snippet;
        header?: Snippet;
    };

    let { tag = 'article', isColor, children, header, class: cssClass, ...restProps }: Props = $props();
</script>

<svelte:element this={tag} class={['message', isColor]} {...restProps}>
    {#if header}
        <div class="message-header">
            {@render header?.()}
        </div>
    {/if}
    <div class="message-body">
        {@render children?.()}
    </div>
</svelte:element>
