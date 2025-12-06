<script lang="ts">
    import { NavBar } from '$lib/bulma/NavBar';
    import { kitCalculateHref } from '@svelte-router/kit';
    import ThemePicker from './ThemePicker.svelte';
    import logo from '@svelte-router/core/logo64';
    import { kitIsRouteActive } from './kitIsRouteActive';
    import { location } from '@svelte-router/core';
    import theme from './state/theme.svelte';
    import { resolve } from '$app/paths';

    const allPositions = [undefined, 'top', 'bottom'] as const;
    let posIndex = $state(0);
    const posIconData = [
        {
            icon: 'fa-circle-dot',
            title: 'Remove fixed position',
        },
        {
            icon: 'fa-chevron-up',
            title: 'Fix to top',
        },
        {
            icon: 'fa-chevron-down',
            title: 'Fix to bottom',
        },
    ];
    let iconDataIndex = $derived((posIndex + 1) % allPositions.length);

    function nextPosition() {
        posIndex = (posIndex + 1) % allPositions.length;
    }
</script>

<NavBar.Root fixed={allPositions[posIndex]} class="py-1 px-2">
    <NavBar.Brand>
        <NavBar.Item>
            <img src={logo} alt="Logo" />
        </NavBar.Item>
        <NavBar.Item>
            <h1 class="title is-4">@svelte-router/kit</h1>
        </NavBar.Item>
        <NavBar.Burger />
    </NavBar.Brand>
    <NavBar.Menu>
        <NavBar.Item
            tag="a"
            isTab
            isActive={kitIsRouteActive('/')}
            href={kitCalculateHref({ preserveQuery: true }, resolve('/'))}>Home</NavBar.Item
        >
        <NavBar.Item
            tag="a"
            isTab
            isActive={kitIsRouteActive('/demo')}
            href={kitCalculateHref({ preserveQuery: true }, resolve('/demo'))}>Start Demo</NavBar.Item
        >
        {#snippet end()}
            <NavBar.Item>
                <a
                    href="https://github.com/WJSoftware/svelte-router-kit"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub Repository"
                >
                    <i class="fab fa-github"></i>
                </a>
            </NavBar.Item>
            <NavBar.Item>
                Sveltekit Path: <code>{location?.url.pathname}</code>
            </NavBar.Item>
            <NavBar.Item>
                <button type="button" title={posIconData[iconDataIndex].title} onclick={nextPosition}>
                    <i class={['fas', posIconData[iconDataIndex].icon]}></i>
                </button>
            </NavBar.Item>
            <NavBar.Item>
                <ThemePicker />
            </NavBar.Item>
        {/snippet}
    </NavBar.Menu>
</NavBar.Root>
