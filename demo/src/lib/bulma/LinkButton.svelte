<script lang="ts">
    import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
    import ButtonImpl, { type BulmaButtonProps } from "./ButtonImpl.svelte";

    type Props = HTMLAnchorAttributes & BulmaButtonProps & {
        type?: HTMLButtonAttributes['type'];
    };

    let { ...restProps }: Props = $props();
</script>

<ButtonImpl tag="a" {...restProps} />
