<script lang="ts">
    import { Router } from "@svelte-router/core";
    import KitFallback from "./KitFallback.svelte";
    import type { Snippet } from "svelte";

    type Props = {
        children?: Snippet;
    };

    let { children }: Props = $props();
</script>

<Router>
    <KitFallback>
        {@render children?.()}
    </KitFallback>
</Router>
