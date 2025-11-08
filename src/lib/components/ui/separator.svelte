<script lang="ts">
	import { Separator } from 'radix-svelte';

	export let orientation: 'horizontal' | 'vertical' = 'vertical';
	export let decorative: boolean = true;
</script>

<Separator.Root
	class="mx-[15px] bg-white data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px"
	{decorative}
	{orientation}
/>
