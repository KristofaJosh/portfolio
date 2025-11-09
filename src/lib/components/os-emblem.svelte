<script lang="ts">
	import { browser } from '$app/environment';
	import { deskAppsStore } from '$lib/stores/desktop-apps.svelte';
	import Icon from '@iconify/svelte';
	import * as localforage from 'localforage';
	import { toLower } from 'ramda';
	import { toast } from 'svelte-sonner';
	import { Motion, type PanInfo } from 'svelte-motion';
	import { twcn } from '~/utils/twcn';
	import { desktopShortcutStore } from '$lib/stores/desktop-shortcut.svelte.js';

	const {
		label = '',
		icon = 'fxemoji:emptydocument',
		onClick,
		deskBoundArea,
		className,
		group = 'others'
	} = $props();

	const labelId = toLower(`${label}_${crypto.randomUUID()}`);

	let clickCount = 0;

	const dblClickId = 'dbl-click';

	const handleClick = (e: MouseEvent): void => {
		e.preventDefault();
		e.stopPropagation();
		toast.dismiss(dblClickId);
		clickCount = 0;
		if (onClick) onClick(e);
	};

	const watchSingleClicks = (e: MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		clickCount += 1;

		if (clickCount > 1 && browser) {
			toast.info('Double click to open', {
				duration: 2000,
				id: dblClickId,
				onDismiss: () => (clickCount = 0),
				onAutoClose: () => (clickCount = 0)
			});
		}
		return;
	};

	const handleDragEnd = (e: MouseEvent, info: PanInfo) => {
		e.stopPropagation();
		clickCount = 0;

		const apps = deskAppsStore?.[group] ?? [];

		apps.forEach((app) => {
			if (!app.id) app.id = labelId;
			desktopShortcutStore.iconPositions[app.id] = { x: info.point.x, y: info.point.y };
		});

		console.log($state.snapshot(desktopShortcutStore.iconPositions));

		localforage.setItem('deskAppsStore', $state.snapshot(deskAppsStore));
		localforage.setItem('desktopShortcutStore', $state.snapshot(desktopShortcutStore));
	};
</script>

<Motion
	drag
	let:motion
	dragConstraints={{ current: deskBoundArea }}
	dragMomentum={false}
	dragTransition={{ bounceStiffness: 1000, bounceDamping: 30 }}
	whileDrag={{ scale: 1.1 }}
	whileTap={{ scale: 0.95 }}
	onDragEnd={handleDragEnd}
>
	<div
		use:motion
		class={twcn(
			'ph-no-rageclick mb-5 flex h-fit w-full max-w-20 min-w-14 flex-col items-center',
			className
		)}
	>
		<button
			class={twcn(
				'flex cursor-pointer flex-col items-center gap-1 text-white transition',
				desktopShortcutStore.isLoading && 'pointer-events-none'
			)}
			ondblclick={handleClick}
			onclick={watchSingleClicks}
		>
			<Icon {icon} class="size-9" />
			<span class="line-clamp-2 text-center text-sm whitespace-break-spaces capitalize"
				>{label}</span
			>
		</button>
	</div>
</Motion>
