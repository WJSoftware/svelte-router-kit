<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    export type Gaps = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

    type Props = HTMLAttributes<HTMLDivElement> & {
        gap?: Gaps;
        multiLine?: boolean;
        vAlign?: 'center' | undefined;
        hAlign?: 'center' | undefined;
    };

    let { class: cssClass, gap, multiLine, vAlign, hAlign, children, ...restProps }: Props = $props();
</script>

<div
    class={[
        'columns',
        cssClass,
        {
            [`is-${gap}`]: (gap ?? -1) >= 0,
            'is-multiline': multiLine,
            'is-vcentered': vAlign === 'center',
            'is-centered': hAlign === 'center',
        },
    ]}
    {...restProps}
>
    {@render children?.()}
</div>
