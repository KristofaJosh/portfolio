import posthog from 'posthog-js';
import { browser } from '$app/environment';
import { PUBLIC_POSTHOG_KEY } from '$env/static/public';
import { dev } from '$app/environment';
import localForage from 'localforage';

export const load = async () => {
	if (browser && !dev) {
		posthog.init(PUBLIC_POSTHOG_KEY, {
			api_host: '/internal-ph',
			ui_host: 'https://eu.posthog.com',
			person_profiles: 'always',
			persistence: 'localStorage+cookie',
			capture_pageview: false,
			capture_pageleave: false,
			capture_exceptions: true
		});
	}

	localForage.config({
		name: 'KrisjOSh',
		storeName: 'app_data',
		description: 'Persistent storage for Portfolio OS app'
	});

	return;
};
load().finally();
