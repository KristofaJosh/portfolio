<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { dev } from '$app/environment';
	import { cursorState } from '$lib/components/download-cv/cursor.svelte';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { twcn } from '~/utils/twcn';

	import posthog from 'posthog-js';
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';

	injectAnalytics({ mode: dev ? 'development' : 'production' });

	if (browser) {
		// beforeNavigate(() => posthog.capture('$pageleave'));
		afterNavigate(() => posthog.capture('$pageview'));
	}

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<section
	class={twcn(
		'relative grid h-dvh grid-rows-[auto_1fr] overflow-hidden md:h-screen',
		cursorState.isLoading && 'loading-cursor'
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
</section>
