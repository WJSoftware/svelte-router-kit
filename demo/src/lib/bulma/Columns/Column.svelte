<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";

    export type ColumnCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

    type Props = HTMLAttributes<HTMLElement> & {
        size?: ColumnCount;
        offset?: ColumnCount;
        narrow?: boolean;
    };

    let {
        class: cssClass,
        size,
        offset,
        narrow,
        children,
        ...restProps
    }: Props = $props();
</script>

<div
    class={['column', cssClass, { [`is-${size}`]: !!size, [`is-offset-${offset}`]: !!offset, [`is-narrow`]: narrow }]}
    {...restProps}
>
    {@render children?.()}
</div>
