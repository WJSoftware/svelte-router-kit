<script lang="ts">
    import { isColors } from '$lib/bulma/common';
    import Content from '$lib/bulma/Content.svelte';
    import Notification from '$lib/bulma/Notification.svelte';
    import type { Hash } from '@svelte-router/core';
    import { KitFallback } from '@svelte-router/kit';

    type Props = {
        hash: Hash;
    };

    let {
        hash,
    }: Props = $props();
</script>

<KitFallback {hash}>
    {#snippet children({ rs })}
        <Content role="tabpanel">
            <h3>Fallback Content</h3>
            <p>
                Oops! This is fallback content that is being rendered because no routes in the parent
                <code>&lt;Router&gt;</code> component are currently matched.
            </p>
            <p>
                The following is the current route status object from the parent router:
            </p>
            <pre>{JSON.stringify(rs, null, 2)}</pre>
        </Content>
        <Notification isColor={isColors.warning}>
            <h3 class="title is-5"><i class="fa-solid fa-lightbulb"></i>&nbsp;Pro Tip</h3>
            <p>
                Always use the <code>&lt;KitFallback&gt;</code> component when using <code>@svelte-router/kit</code> 
                because the stock <code>&lt;Fallback&gt;</code> component from <code>@svelte-router/core</code> renders 
                content in the server, producing brief flashes of content.
            </p>
        </Notification>
    {/snippet}
</KitFallback>
