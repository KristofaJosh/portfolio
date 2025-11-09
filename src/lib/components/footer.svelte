<script lang="ts">
	import { twcn } from '~/utils/twcn';
</script>

<div class="relative mx-auto w-full max-w-[80%]">
	<footer
		class={twcn(
			'relative z-10 grid w-full items-center gap-6 rounded-lg p-6',
			'grid-cols-[auto_auto_1fr] text-white',
			'-translate-y-8 transform',
			'mx-4 hidden'
		)}
		style="perspective: 390px;"
	>
		<div>ai - search et al</div>
		<div class="grid grid-flow-col">open tabs</div>
	</footer>
	<div
		class={twcn('w-full rounded-lg', 'bg-white/10 shadow backdrop-blur-2xl', 'dock inset-y-0')}
	></div>
</div>

<style>
	.dock {
		transform: perspective(390px) rotateX(48deg);
		position: absolute;
		height: 60px;
	}
</style>
