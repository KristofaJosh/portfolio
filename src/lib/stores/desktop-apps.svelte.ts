import type { AppWindowI } from '$lib/stores/app-window.svelte';
import { funProjectWindow } from '$lib/windows/fun-project';
import { liveProjectWindow } from '$lib/windows/live-project';

type BaseType = {
	id?: string;
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

interface DownloadLink extends BaseType {
	download: {
		link: string;
		title: string;
	};
}

export type DeskApps = InternalLink | ExternalLink | DownloadLink;

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

const others = [
	{
		download: {
			link: 'https://docs.google.com/document/d/1eEzF4OerbyvkHzUgnLfdpPt4NVeU6Z5PaxHIbBHHkHg/export?format=pdf',
			title: 'Chris_Josh_CV.pdf'
		},
		label: 'download CV',
		icon: 'tabler:file-cv-filled'
	}
];

export const deskAppsStore = $state({
	socials,
	others,
	projects
} as Record<string, DeskApps[]>);
