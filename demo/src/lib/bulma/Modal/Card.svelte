<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        header?: Snippet;
        footer?: Snippet;
    }

    let {
        class: cssClass,
        header,
        footer,
        children,
        ...restProps
    }: Props = $props();
</script>

<div class={['modal-card', cssClass]} {...restProps}>
    {#if header}
        <header class="modal-card-head">
            {@render header?.()}
        </header>
    {/if}
    <section class="modal-card-body">
        {@render children?.()}
    </section>
    {#if footer}
        <footer class="modal-card-foot">
            {@render footer?.()}
        </footer>
    {/if}
</div>
