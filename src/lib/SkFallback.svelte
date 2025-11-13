<script lang="ts">
    import { browser } from '$app/environment';
    import { Fallback } from '@svelte-router/core';
    import type { ComponentProps } from 'svelte';

    let { when, ...restProps }: ComponentProps<typeof Fallback> = $props();
</script>

<Fallback when={(rs, noMatches) => browser && (when?.(rs, noMatches) || (!when && noMatches))} {...restProps} />
