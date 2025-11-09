<script lang="ts">
	import { browser } from '$app/environment';
	import OsEmblem from '$lib/components/os-emblem.svelte';
	import { appWindowStore } from '$lib/stores/app-window.svelte';
	import { type DeskApps, deskAppsStore } from '$lib/stores/desktop-apps.svelte';
	import { desktopShortcutStore } from '$lib/stores/desktop-shortcut.svelte';
	import posthog from 'posthog-js';
	import { twcn } from '~/utils/twcn';
	import { toLower, replace } from 'ramda';

	let deskBoundArea;

	const groupedApps = Object.entries(deskAppsStore).flatMap(([group, appList]) =>
		appList.map((app) => ({ ...app, group }))
	);

	const onDesktopClick = (app: DeskApps) => {
		if (app.wip && app.wip.enabled) {
			return () => {};
		}

		const evt = replace(/ /g, '_', toLower(`${app.label}_clicked`));
		if (browser) posthog.capture(evt);
		return async () => {
			if ('href' in app) window.open(app.href, '_blank');
			if ('link' in app) appWindowStore.open(app.windowObject);
			if ('download' in app) {
				posthog.capture(`${app.download.title}_download_clicked`);
				desktopShortcutStore.isLoading = true;
				try {
					const response = await fetch(app.download.link);
					const blob = await response.blob();
					const url = URL.createObjectURL(blob);

					const a = document.createElement('a');
					a.href = url;
					a.download = app.download.title;
					document.body.appendChild(a);
					a.click();
					a.remove();
					URL.revokeObjectURL(url);
				} catch {
					// TODO: track error
				} finally {
					desktopShortcutStore.isLoading = false;
				}
			}
		};
	};

	const c = desktopShortcutStore.iconPositions;
</script>

<svelte:head>
	<title>Joshua Enyi‑Christopher — Frontend & Full‑Stack Engineer</title>
	<meta
		name="description"
		content="Building performant, intuitive, and human‑centered digital experiences. Frontend & Full‑Stack Engineer specializing in TypeScript, Svelte, and modern web."
	/>
</svelte:head>

<section class="relative inset-0 h-full w-full gap-2 overflow-hidden" bind:this={deskBoundArea}>
	{#each groupedApps as app (app.label)}
		<OsEmblem
			{deskBoundArea}
			{...app}
			className={twcn(app.wip && app.wip.enabled ? 'opacity-50 pointer-events-none' : '')}
			onClick={onDesktopClick(app)}
		/>
	{/each}
</section>
