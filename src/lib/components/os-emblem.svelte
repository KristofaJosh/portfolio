<script lang="ts">
	import { browser } from '$app/environment';
	import { deskAppsStore } from '$lib/stores/desktop-apps.svelte';
	import Icon from '@iconify/svelte';
	import localforage from 'localforage';
	import { toast } from 'svelte-sonner';
	import { Motion, type PanInfo } from 'svelte-motion';
	import { getLabelId } from '~/utils/get-label-id';
	import { twcn } from '~/utils/twcn';
	import { desktopShortcutStore } from '$lib/stores/desktop-shortcut.svelte.js';

	const {
		label = '',
		icon = 'fxemoji:emptydocument',
		onClick,
		deskBoundArea,
		className = '',
		group = 'others'
	} = $props();

	const labelId = getLabelId(label);

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

	const handleDragEnd = async (e: MouseEvent, info: PanInfo) => {
		console.log(e.detail.x);
		e.stopPropagation();
		clickCount = 0;

		const deskApp = $state.snapshot(deskAppsStore);
		const appGroup = deskApp[group] ?? [];

		const isModified = appGroup.find(
			(x: { id?: string; label: string }) => x.label === label && x.id
		);

		if (!isModified) {
			appGroup.forEach((x: { label: string; id?: string }) => {
				if (x.label === label) x.id = labelId;
			});
			deskAppsStore[group] = appGroup;
			desktopShortcutStore.iconPositions[labelId] = { x: info.point.x, y: info.point.y };
		} else if (isModified && isModified.id) {
			console.log('Updating position for', isModified.id);
			const id = isModified.id;
			desktopShortcutStore.iconPositions[id] = { x: info.point.x, y: info.point.y };
		}

		try {
			await localforage.setItem('deskAppsStore', $state.snapshot(deskAppsStore));
			await localforage.setItem('desktopShortcutStore', $state.snapshot(desktopShortcutStore));
		} catch (err) {
			console.error('Failed to persist stores:', err);
		}
	};

	let initialPosition = $state({ x: 0, y: 0 });

	$effect.pre(() => {
		const initialPositionId = deskAppsStore[group].find((x) => x.id)?.id;
		if (initialPositionId) initialPosition = desktopShortcutStore.iconPositions[initialPositionId];
	});
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
	initial={false}
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
