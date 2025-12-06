<script lang="ts">
    import { resolve } from '$app/paths';
    import { isColors } from '$lib/bulma/common';
    import Content from '$lib/bulma/Content.svelte';
    import Hero from '$lib/bulma/Hero.svelte';
    import Section from '$lib/bulma/Section.svelte';
    import { kitCalculateHref } from '@svelte-router/kit';
</script>

<Section>
    <Hero isColor={isColors.info}>
        <p class="title">@svelte-router/kit</p>
        <p class="subtitle">Hash routing on top of SvelteKit's path routing</p>
    </Hero>
</Section>
<Section>
    <Content>
        <h1>Welcome!</h1>
        <p>
            This is a demonstration of the <strong>@svelte-router/kit</strong> package, which provides hash routing 
            capabilities on top of SvelteKit's built-in path routing.
        </p>
        <p>
            To start the demonstration, click on the <strong>"Start Demo"</strong> link in the navbar, or the big, 
            fat button below.
        </p>
        <div class="has-text-centered">
            <a class="button is-primary is-large" href={kitCalculateHref({ preserveQuery: true }, resolve('/demo'))}>
                <i class="fa-solid fa-flag-checkered"></i>&nbsp;
                Start Demo
            </a>
        </div>
    </Content>
</Section>
