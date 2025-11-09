<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { dev } from '$app/environment';
	import { type DeskApps, deskAppsStore } from '$lib/stores/desktop-apps.svelte';
	import {
		type DesktopShortcut,
		desktopShortcutStore
	} from '$lib/stores/desktop-shortcut.svelte.js';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import localforage from 'localforage';
	import { twcn } from '~/utils/twcn';
	import { Toaster } from 'svelte-sonner';

	import posthog from 'posthog-js';
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';

	injectAnalytics({ mode: dev ? 'development' : 'production' });

	if (browser) {
		// beforeNavigate(() => posthog.capture('$pageleave'));
		afterNavigate(() => posthog.capture('$pageview'));

		async function updateStores() {
			const [appStore, shortcutStore] = await Promise.all([
				localforage.getItem<DeskApps>('deskAppsStore'),
				localforage.getItem<DesktopShortcut>('desktopShortcutStore')
			]);

			if (shortcutStore) {
				desktopShortcutStore.iconPositions = shortcutStore.iconPositions;
			}
			if (appStore) {
				Object.entries(appStore).forEach(([key, shortcut]) => {
					deskAppsStore[key] = shortcut;
				});
			}
		}
		updateStores();
	}

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<section
	class={twcn(
		'relative grid h-dvh grid-rows-[auto_1fr] overflow-hidden md:h-screen',
		desktopShortcutStore.isLoading && 'loading-cursor'
	)}
>
	<div class="pointer-events-none absolute inset-0 -z-10 h-screen bg-black">
		<div class="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl"></div>
		<div
			class="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl"
		></div>
	</div>
	<Header />
	<main class="p-4">
		{@render children?.()}
	</main>
	<Footer />
	<Toaster  position="top-center"  offset="50px" />
</section>
