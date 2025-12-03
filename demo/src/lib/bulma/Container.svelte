<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        fluid?: boolean;
    };

    let {
        class: cssClass,
        fluid = false,
        children,
        ...restProps
    }: Props = $props();
</script>

<div
    class={['container', cssClass, { 'is-fluid': fluid }]}
    {...restProps}
>
    {@render children?.()}
</div>
