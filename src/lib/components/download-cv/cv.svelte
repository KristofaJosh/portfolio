<script lang="ts">
	import { cursorState } from '$lib/components/download-cv/cursor.svelte';
	import OsEmblem from '$lib/components/os-emblem.svelte';
	import posthog from 'posthog-js';

	const onDownloadClick = async (event: MouseEvent) => {
		event.preventDefault();
		cursorState.isLoading = true;
		try {
			const response = await fetch(
				'https://docs.google.com/document/d/1eEzF4OerbyvkHzUgnLfdpPt4NVeU6Z5PaxHIbBHHkHg/export?format=pdf'
			);
			const blob = await response.blob();
			const url = URL.createObjectURL(blob);

			const a = document.createElement('a');
			a.href = url;
			a.download = 'Chris_Josh_CV.pdf';
			document.body.appendChild(a);
			a.click();
			a.remove();
			URL.revokeObjectURL(url);

			posthog.capture('cv_download_clicked');
		} catch {
			// TODO: track error
		} finally {
			cursorState.isLoading = false;
		}
	};

	const { deskBoundArea } = $props();
</script>

<OsEmblem
	icon="tabler:file-cv-filled"
	{deskBoundArea}
	label="download CV"
	onClick={onDownloadClick}
/>
