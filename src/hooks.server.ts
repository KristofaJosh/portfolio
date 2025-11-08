import { paraglideMiddleware } from '$lib/paraglide/server';
import * as auth from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const handleParaglide: Handle = ({ event, resolve }) => paraglideMiddleware(event.request, ({ request, locale }) => {
	event.request = request;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
	});
});

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(auth.sessionCookieName);

	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await auth.validateSessionToken(sessionToken);

	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};

const handlePH: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;

	const path = '/internal-ph';

	if (pathname.startsWith('/internal-ph')) {
		// Determine target hostname based on static or dynamic ingestion
		const hostname = pathname.startsWith(`${path}/static/`)
			? 'eu-assets.i.posthog.com' // change eu to eu for EU Cloud
			: 'eu.i.posthog.com'; // change eu to eu for EU Cloud

		// Build external URL
		const url = new URL(event.request.url);
		url.protocol = 'https:';
		url.hostname = hostname;
		url.port = '443';
		url.pathname = pathname.replace(`${path}/`, '');

		// Clone and adjust headers
		const headers = new Headers(event.request.headers);
		headers.set('Accept-Encoding', '');
		headers.set('host', hostname);

		// Proxy the request to the external host
		return await fetch(url.toString(), {
			method: event.request.method,
			headers,
			body: event.request.body,
			duplex: 'half'
		});
	}

	return await resolve(event);
}

export const handle: Handle = sequence(handleParaglide, handleAuth, handlePH);