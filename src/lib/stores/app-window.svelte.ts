export interface AppWindowI {
	id: string;
	title: string;
	position?: {
		x: number;
		y: number;
	};
}

interface AppWindowInternal extends AppWindowI {
	state: {
		minimized: boolean;
		maximized: boolean;
	};
	position: {
		x: number;
		y: number;
	};
}

type AppWindowStoreI = {
	active: {
		id: string;
		title: string;
		state: AppWindowInternal['state'];
	} | null;
	windows: Record<string, AppWindowInternal> | null;
};

import { writable } from 'svelte/store';

function createStore() {
	const { subscribe, update } = writable<AppWindowStoreI>();

	return {
		subscribe,
		maximize: (window: AppWindowI) => {
			update((store) => {
				store.active = {
					id: window.id,
					title: window.title,
					state: { minimized: false, maximized: true }
				};
				return store;
			});
		},
		minimize: () => {},
		open: (window: AppWindowI) => {
			update((store) => {
				const defaultState = { minimized: false, maximized: false };
				store.active = { id: window.id, title: window.title, state: defaultState };

				const newWindow = { ...window, state: defaultState, position: { x: 0, y: 0 } };
				store.windows =
					store.windows === null
						? { [window.id]: newWindow }
						: { ...store.windows, [window.id]: newWindow };

				return store;
			});
		},
		close: () => {},
		setActive: () => {}
	};
}

export const appWindowStore = createStore();
