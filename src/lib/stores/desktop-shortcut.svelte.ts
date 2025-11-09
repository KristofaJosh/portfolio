export type DesktopShortcut = {
	isLoading: boolean;
	iconPositions: Record<
		string,
		{
			x: number;
			y: number;
		}
	>;
}

export const desktopShortcutStore = $state<DesktopShortcut>({
	isLoading: false,
	iconPositions: {}
});
