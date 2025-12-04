<script lang="ts">
	import type { ClassValue, HTMLAttributes } from 'svelte/elements';
	import Highlight, { type LanguageType } from 'svelte-highlight';
	import 'svelte-highlight/styles/github.css';
	import Button from './bulma/Button.svelte';
	import { isColors, isSizes, type IsColor } from './bulma/common';
	import Message from './bulma/Message.svelte';
	import theme from './state/theme.svelte';
	import { clsx } from 'clsx';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		language: LanguageType<string>;
		code: string;
		title?: string;
		copyable?: boolean;
		isColor?: IsColor;
	}

	let { language, code, title, copyable = true, isColor, class: cssClass, ...restProps }: Props = $props();

	let copied = $state(false);
	let codeNode = $state<HTMLElement | null>(null);

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy code: ', err);
		}
	}

	$effect(() => {
		const root = codeNode?.querySelector('.hljs');
		if (!root) return;
		styleDirectTextChildren(root, 'orphan-text-node');
	});

	function styleDirectTextChildren(root: Node, cssClass: ClassValue) {
		for (const node of root.childNodes) {
			if (node.nodeType === Node.TEXT_NODE && node.nodeValue?.trim()) {
				const span = document.createElement('span');
				span.textContent = node.nodeValue;
				span.classList.add(clsx(cssClass));
				root.replaceChild(span, node);
			}
		}
	}
</script>

<!-- <div class={['code-snippet', cssClass]} {...restProps}> -->
<Message {isColor} tag="div" class={cssClass} {...restProps}>
	{#snippet header()}
		{#if title || copyable}
			{#if title}
				<span class="code-snippet-title">{title}</span>
			{/if}
			{#if copyable}
				<Button
					outlined
					isColor={isColors.success}
					isSize={isSizes.small}
					class="copy-btn"
					onclick={copyToClipboard}
					disabled={copied}
				>
					{#if copied}
						<i class="bi bi-check"></i> Copied!
					{:else}
						<i class="bi bi-clipboard"></i> Copy
					{/if}
				</Button>
			{/if}
		{/if}
	{/snippet}
	<div bind:this={codeNode} class={['code-snippet-content', { dark: theme.current === 'dark' }]}>
		<Highlight {language} {code} />
	</div>
</Message>

<style>
	:root {
		/* --text-color: #363636; Bulma default for light mode */
		--code-bg: #f5f5f5;
		--code-text: #2a2a2a;
	}

	@media (prefers-color-scheme: dark) {
		:root {
			/* --text-color: hsl(0, 0%, 71%); */
			--code-bg: hsl(0, 0%, 14%);
			--code-text: hsl(0, 0%, 85%);
		}
	}

	.code-snippet {
		border: 1px solid var(--bulma-info-on-scheme);
		border-radius: 0.45em;
		/* background-color: var(--bs-body-bg); */
		margin: 1rem 0;
		overflow: hidden;
	}

	.code-snippet-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* padding: 0.5rem 1rem; */
		/* background-color: var(--bs-light); */
		/* border-bottom: 1px solid var(--bulma-info-on-scheme); */
		font-size: 0.875rem;
	}

	.code-snippet-title {
		font-weight: 600;
		/* color: var(--bs-secondary); */
	}

	:global .copy-btn {
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
		transition: all 0.2s ease;
		&:disabled {
			color: var(--bs-success);
			border-color: var(--bs-success);
		}
	}

	:global .code-snippet-content {
		position: relative;

		&.dark {
			--text-color: hsl(0, 0%, 71%);
			--code-bg: hsl(0, 0%, 14%);
			--code-text: hsl(0, 0%, 85%);
		}
	}

	:global .orphan-text-node {
		color: var(--code-text);
	}

	:global .code-snippet-content pre {
		margin: 0 !important;
		padding: 0 !important;
		background-color: transparent !important;
		border: none !important;
		border-radius: 0 !important;

		& #text {
			color: aquamarine;
		}
	}

	.code-snippet-content :global(code) {
		padding: 0 !important;
		background-color: transparent !important;
	}

	/* Dark mode support */
	@media (prefers-color-scheme: dark) {
		.code-snippet-header {
			background-color: var(--bs-dark);
			border-bottom-color: var(--bs-secondary);
		}
	}
</style>
