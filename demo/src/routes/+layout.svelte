<script lang="ts">
	import '@fortawesome/fontawesome-free/css/all.css';
	import favicon from '$lib/assets/favicon.svg';
	import './main.scss';
	import { init, type KitInitOptions } from '@svelte-router/kit';
	import NavBar from '$lib/NavBar.svelte';
	import theme from '$lib/state/theme.svelte.js';
    import { page } from '$app/state';

	let { children } = $props();
	let hashMode: KitInitOptions['hashMode'] = page.url.searchParams.has('multi') ? 'multi' : 'single';
	console.debug('Initializing router...');
	init({ hashMode });
	console.debug('Router initialized with hash mode:', hashMode);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class={{ 'theme-dark': theme.current === 'dark' }}>
	<div class="container is-max-widescreen">
		<NavBar />
		{#key hashMode}
			<main>
				{@render children?.()}
			</main>
		{/key}
	</div>
</div>
