<script lang="ts">
    import { browser } from '$app/environment';
    import { Fallback } from '@svelte-router/core';
    import type { ComponentProps } from 'svelte';

    let { ...restProps }: ComponentProps<typeof Fallback> = $props();
</script>

{#if browser}
    <Fallback {...restProps} />
{/if}
