<script>
	import { twcn } from '~/utils/twcn';
	import { onMount } from 'svelte';
	import { format } from 'date-fns';
	let currentTime = '';

	const today = format(new Date(), 'MMM dd, yyyy');

	function updateTime() {
		const now = new Date();
		currentTime = format(now, 'hh:mm a');
	}

	onMount(() => {
		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	});
</script>

<header
	class={twcn(
		'grid grid-cols-[1fr_auto] items-center gap-4 px-4 py-2',
		'bg-white/10 text-sm text-white  backdrop-blur-2xl'
	)}
>
	<div class="flex w-full items-center gap-6">
		<p>Krisj<span class="font-semibold">OS</span>h</p>
		<div class="flex flex-grow-1 items-center gap-4">
			<!--            <a href="#">Blog</a>-->
		</div>
	</div>
	<div>
		<div class=" font-semibold">
			<span>{today}</span> <span>{currentTime}</span>
		</div>
	</div>
</header>
