<script lang="ts">
	import {browser} from "$app/environment";
    import DownloadCV from '$lib/components/download-cv/cv.svelte';
	import OsEmblem from '$lib/components/os-emblem.svelte';
	import { type DeskApps, deskApps } from '$lib/stores/desktop-apps.svelte';
    import posthog from "posthog-js";

	const apps = Object.values(deskApps).flat();
	let deskBoundArea;

	const onDesktopClick = (app: DeskApps) => {
        const evt = `${app.label}_clicked`.toLowerCase().replaceAll(' ','_')
        if(browser) posthog.capture(evt)
        return () => {
			if (app.href) window.open(app.href, '_blank');
			if (app.link) {
				//
			}
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

<section
	class="relative gap-2 inset-0 h-full w-full overflow-hidden"
	bind:this={deskBoundArea}
>
	<DownloadCV {deskBoundArea} />
	{#each apps as app (app.label)}
		<OsEmblem icon={app.icon} {deskBoundArea} label={app.label} onClick={onDesktopClick(app)} />
	{/each}
</section>
