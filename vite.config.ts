import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['@svelte-router/core']
	},
	test: {
		expect: { requireAssertions: true },
		includeTaskLocation: true,
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'firefox' }, { browser: 'chromium' }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}', 'src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**', 'src/**/*.server.{test,spec}.{js,ts}'],
					setupFiles: ['./vitest-setup-client.ts']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.server.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
