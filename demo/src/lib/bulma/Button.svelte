<script lang="ts">
    import type { HTMLButtonAttributes } from "svelte/elements";
    import ButtonImpl, { type BulmaButtonProps } from "./ButtonImpl.svelte";

    type Props = Omit<HTMLButtonAttributes, 'type'> & BulmaButtonProps & {
        type?: HTMLButtonAttributes['type'];
    };

    let { type = 'button', ...restProps }: Props = $props();
</script>

<ButtonImpl tag="button" {type} {...restProps} />
