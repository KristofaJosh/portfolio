<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Motion } from 'svelte-motion';
	import { twcn } from '~/utils/twcn';
	import { cursorState } from '$lib/components/download-cv/cursor.svelte.js';

	export let label = '';
	export let icon = 'fxemoji:emptydocument';
	export let onClick;
	export let deskBoundArea;
</script>

<Motion
	drag
	let:motion
	dragConstraints={{ current: deskBoundArea }}
	dragMomentum={false}
	dragTransition={{ bounceStiffness: 1000, bounceDamping: 30 }}
	whileDrag={{
		scale: 1.1
	}}
	whileTap={{ scale: 0.95 }}
>
	<div use:motion class="mb-5 flex h-fit w-full min-w-14 flex-col items-center max-w-20">
		<button
			class={twcn(
				'flex cursor-pointer flex-col items-center gap-1 text-white transition',
				cursorState.isLoading && 'pointer-events-none'
			)}
			ondblclick={onClick}
		>
			<Icon {icon} class="size-9" />
			<span class="text-center text-sm whitespace-break-spaces capitalize line-clamp-2">{label}</span>
		</button>
	</div>
</Motion>
