<script>
	const year = new Date().getFullYear();
	const socials = [
		{ href: 'https://github.com/KristofaJosh', label: 'GitHub', icon: 'devicon-github-original' },
		{
			href: 'https://www.linkedin.com/in/christofajosh',
			label: 'LinkedIn',
			icon: 'devicon-linkedin-plain'
		},
		{
			href: 'https://stackoverflow.com/users/8149165/chris-josh',
			label: 'Stack Overflow',
			icon: 'devicon-stackoverflow-plain'
		}
	];
</script>

<svelte:head>
	<title>Joshua Enyi‑Christopher — Frontend & Full‑Stack Engineer</title>
	<meta
		name="description"
		content="Building performant, intuitive, and human‑centered digital experiences. Frontend & Full‑Stack Engineer specializing in TypeScript, Svelte, and modern web."
	/>
</svelte:head>

<section class="relative grid h-screen grid-rows-[1fr_auto] overflow-hidden">
	<!-- Decorative background -->
	<div class="pointer-events-none absolute inset-0 -z-10 h-screen bg-black">
		<div class="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl"></div>
		<div
			class="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl"
		></div>
	</div>

	<div class="mx-auto grid min-h-[80svh] max-w-7xl place-items-center px-6 py-20 sm:py-28 md:py-32">
		<div class="text-center">
			<h1 class="text-5xl font-bold tracking-tight text-balance sm:text-6xl md:text-7xl">
				<span class="bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">
					Joshua Enyi‑Christopher
				</span>
			</h1>

			<p class="mt-4 text-lg text-pretty text-slate-300 sm:text-xl">
				Frontend & Full‑Stack Engineer
			</p>

			<p
				class="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-slate-400 sm:text-lg"
			>
				Building performant, intuitive, and user‑centered digital experiences with modern web tech.
			</p>

			<div class="mt-8 flex hidden flex-wrap items-center justify-center gap-2">
				<span class="rounded-full border border-slate-700/70 px-3 py-1 text-xs text-slate-300">
					Open to roles & freelance
				</span>
				<span class="rounded-full border border-slate-700/70 px-3 py-1 text-xs text-slate-300">
					Remote‑friendly
				</span>
				<span class="rounded-full border border-slate-700/70 px-3 py-1 text-xs text-slate-300">
					TypeScript • Svelte • Node
				</span>
			</div>
		</div>
	</div>

	<footer class="flex flex-col-reverse md:flex-row gap-4 grid-cols p-4 text-sm">
		<div class="flex-grow-1">
			<p class="text-sm text-slate-500">&copy; {year} ChrisJosh</p>
		</div>
		<div class="flex items-center flex-col md:flex-row gap-4">
			{#each socials as social (social.label)}
				<a
					href={social.href}
					target="_blank"
					class="flex items-center gap-1 text-slate-400 transition hover:text-white"
					aria-label={social.label}
				>
					<i class={social.icon}></i>
					<span>{social.label}</span>
				</a>
			{/each}
			<a
				href="https://docs.google.com/document/d/1K3aqYmDQN40f6VU83D53IiXq0MQm63gh0wKnzB4UtcE/export?format=pdf"
				download
				class="flex items-center gap-1 text-slate-400 transition hover:text-white"
				aria-label="Download CV"
			>
				<i class="devicon-google-plain"></i>
				<span>Download CV</span>
			</a>
		</div>
	</footer>
</section>
