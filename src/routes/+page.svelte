<script lang="ts">
	import { browser } from '$app/environment';
	import DownloadCV from '$lib/components/download-cv/cv.svelte';
	import OsEmblem from '$lib/components/os-emblem.svelte';
	import { appWindowStore } from '$lib/stores/app-window.svelte';
	import { type DeskApps, deskAppsStore } from '$lib/stores/desktop-apps.svelte';
	import posthog from 'posthog-js';
	import { twcn } from '~/utils/twcn';
	import { toLower, replace } from 'ramda';

	const apps = Object.values(deskAppsStore).flat();
	let deskBoundArea;

	const onDesktopClick = (app: DeskApps) => {
		if (app.wip && app.wip.enabled) {
			return () => {};
		}

		const evt = replace(/ /g, '_', toLower(`${app.label}_clicked`));
		if (browser) posthog.capture(evt);
		return () => {
			if ('href' in app) window.open(app.href, '_blank');
			if ('link' in app) appWindowStore.open(app.windowObject);
		};
	};
</script>

<svelte:head>
	<title>Joshua Enyi‑Christopher — Frontend & Full‑Stack Engineer</title>
	<meta
		name="description"
		content="Building performant, intuitive, and human‑centered digital experiences. Frontend & Full‑Stack Engineer specializing in TypeScript, Svelte, and modern web."
	/>
</svelte:head>

<section class="relative inset-0 h-full w-full gap-2 overflow-hidden" bind:this={deskBoundArea}>
	{#each apps as app (app.label)}
		<OsEmblem
			icon={app.icon}
			{deskBoundArea}
			label={app.label}
			className={twcn(app.wip && app.wip.enabled ? 'opacity-50 pointer-events-none' : '')}
			onClick={onDesktopClick(app)}
		/>
	{/each}
    <DownloadCV {deskBoundArea} />
</section>
