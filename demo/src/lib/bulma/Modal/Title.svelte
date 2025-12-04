<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLElement> & {
        tag?: string;
    };

    let {
        tag = 'p',
        class: cssClass,
        children,
        ...restProps
    }: Props = $props();
</script>

<svelte:element this={tag} class={['modal-card-title', cssClass]} {...restProps}>
    {@render children?.()}
</svelte:element>
