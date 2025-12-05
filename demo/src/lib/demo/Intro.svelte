<script lang="ts">
    import { Columns } from '$lib/bulma/Columns';
    import { isColors, isSizes } from '$lib/bulma/common';
    import Container from '$lib/bulma/Container.svelte';
    import Content from '$lib/bulma/Content.svelte';
    import LinkButton from '$lib/bulma/LinkButton.svelte';
</script>

<Content role="tabpanel">
    <h3>Introduction</h3>
    <p>
        This <code>Tabs</code> component demonstrates hash routing on top of SvelteKit's built-in path routing.
    </p>
    <p>
        Each one of these tabs, which are constructed using the <code>@svelte-router/core</code>'s
        <code>&lt;Link&gt;</code>
        component, updates the hash path in the URL when clicked.
    </p>
    <p>
        The active style on the tab is applied using the <code>activeBehavior</code> action, which applies the
        <code>is-active</code> class when the associated route is active.
    </p>
</Content>
<Container>
    <Columns.Root>
        <Columns.Column size={2}>
            <LinkButton
                isSize={isSizes.small}
                isColor={isColors.info}
                target="_blank"
                rel="noopener noreferrer"
                href="https://wjfe-n-savant.hashnode.space"
            >
                Online Docs
            </LinkButton>
        </Columns.Column>
        <Columns.Column offset={3}>
            <LinkButton
                isSize={isSizes.small}
                isColor={isColors.link}
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/WJSoftware/svelte-router-kit"
                class="text-wrap"
            >
                <i class="fab fa-github"></i>&nbsp; GitHub Repository (extension package)
            </LinkButton>
        </Columns.Column>
        <Columns.Column>
            <LinkButton
                isSize={isSizes.small}
                isColor={isColors.link}
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/WJSoftware/svelte-router"
                class="text-wrap"
            >
                <i class="fab fa-github"></i>&nbsp; GitHub Repository (core package)
            </LinkButton>
        </Columns.Column>
    </Columns.Root>
</Container>
