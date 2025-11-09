import type { AppWindowI } from '$lib/stores/app-window.svelte';
import { funProjectWindow } from '$lib/windows/fun-project';
import { liveProjectWindow } from '$lib/windows/live-project';

type BaseType = {
	label: string;
	icon: string;
	wip?: {
		enabled: boolean;
		note: string;
	};
};
interface InternalLink extends BaseType {
	link: string;
	windowObject: AppWindowI;
}

interface ExternalLink extends BaseType {
	href: string;
}

export type DeskApps = InternalLink | ExternalLink;

export const socials = [
	{
		href: 'https://github.com/KristofaJosh',
		label: 'GitHub',
		icon: 'skill-icons:github-dark'
	},
	{
		href: 'https://www.linkedin.com/in/christofajosh',
		label: 'LinkedIn',
		icon: 'devicon:linkedin'
	},
	{
		href: 'https://stackoverflow.com/users/8149165/chris-josh',
		label: 'Stack Overflow',
		icon: 'devicon:stackoverflow'
	}
];

export const projects = [
	{
		label: 'Fun Projects',
		link: '/fun-projects',
		windowObject: funProjectWindow,
		icon: 'material-icon-theme:folder-vm',
		wip: {
			enabled: false,
			note: 'Update in progress...'
		}
	},
	{
		label: 'Live Projects',
		link: '/live-projects',
		windowObject: liveProjectWindow,
		icon: 'material-icon-theme:folder-ui',
		wip: {
			enabled: false,
			note: 'Update in progress...'
		}
	}
];

export const deskAppsStore = $state({
	socials,
	other: [],
	projects
} as Record<string, DeskApps[]>);
