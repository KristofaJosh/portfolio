import posthog from 'posthog-js';
import { browser } from '$app/environment';
import { PUBLIC_POSTHOG_KEY } from '$env/static/public';

export const load = async () => {
	if (browser) {
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
	return;
};
load().finally();
