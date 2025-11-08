<script lang="ts">
	import { Popper } from 'radix-svelte';
	import type { ResolvedProps } from 'radix-svelte';

	let arrowWidth: number = 10;
	let arrowHeight: number = 5;
	let contentSide = 'bottom';
	let contentSideOffset: number;
	let contentAlign = 'center';
	let contentAlignOffset: number;
	let contentArrowPadding: number;
	let contentCollisionPadding: number;
	let contentSticky = 'partial';
	let contentHideWhenDetached: boolean;
	let contentAvoidCollisions: boolean = true;

	let open = false;

    const {children} = $props();

</script>

<div class="grid place-items-center">
	<Popper.Root>
		<Popper.Anchor
			class="text-vermilion-800 hover:bg-vermilion-100 rounded-md
			bg-white px-4 py-2 leading-none font-medium shadow-lg"
			on:click={() => (open = true)}>Open</Popper.Anchor
		>
		{#if open}
			<Popper.Content
				class="rounded-lg bg-black/20 p-4"
				side={contentSide}
				sideOffset={contentSideOffset}
				align={contentAlign}
				alignOffset={contentAlignOffset}
				arrowPadding={contentArrowPadding}
				collisionPadding={contentCollisionPadding}
				sticky={contentSticky}
				hideWhenDetached={contentHideWhenDetached}
				avoidCollisions={contentAvoidCollisions}
			>
				<button on:click={() => (open = false)}>close</button>
				<Popper.Arrow width={arrowWidth} height={arrowHeight} class="fill-black/20" />
			</Popper.Content>
		{/if}
	</Popper.Root>
</div>
