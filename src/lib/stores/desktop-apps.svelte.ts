type BaseType = {
	label: string;
	icon: string;
};
interface InternalLink extends BaseType {
	link: string;
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
		link: 'https://github.com/KristofaJosh',
		icon: 'material-icon-theme:folder-vm'
	},
	{
		label: 'Live Projects',
		link: 'https://github.com/KristofaJosh',
		icon: 'material-icon-theme:folder-ui'
	}
];

export const deskApps = $state({
	socials,
	other: [],
	projects
} as Record<string, DeskApps[]>);
