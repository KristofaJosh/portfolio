<script lang="ts">
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';
	import { toast } from 'svelte-sonner';
	import { Motion } from 'svelte-motion';
	import { twcn } from '~/utils/twcn';
	import { cursorState } from '$lib/components/download-cv/cursor.svelte.js';

	export let label = '';
	export let icon = 'fxemoji:emptydocument';
	export let onClick;
	export let deskBoundArea;
	export let className = '';

	let clickCount = 0;

	const dblClickId = 'dbl-click';

	const handleClick = (e: MouseEvent): void => {
		e.preventDefault();
		e.stopPropagation();
		toast.dismiss(dblClickId);
		clickCount = 0;
		if (onClick) onClick(e);
	};

	const watchSingleClicks = (event: MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();

		clickCount += 1;

		if (clickCount > 2 && browser) {
			toast.info('Double click to open', {
				duration: 2000,
				id: dblClickId,
				onDismiss: () => (clickCount = 0),
				onAutoClose: () => (clickCount = 0)
			});
		}
		return;
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
	onDragStart={(event, info) => console.log(info.point.x, info.point.y)}
	onDragEnd={() => {
		clickCount = 0;
	}}
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
				cursorState.isLoading && 'pointer-events-none'
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
