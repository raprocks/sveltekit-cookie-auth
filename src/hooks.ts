import * as cookie from 'cookie';
import { Tedis } from 'tedis';
import * as env from '$lib/env';
import type { Handle } from '@sveltejs/kit';
import type { GetSession } from '@sveltejs/kit/types/hooks';

const db = new Tedis({
	host: env.REDIS_URL,
	password: env.REDIS_PASSWORD,
	port: env.REDIS_PORT
});

export const handle: Handle = async function ({ request, resolve }) {
	const cookies = cookie.parse(request.headers.cookie || '');

	if (!cookies.session_id) {
		request.locals.authenticated = false;
		const resp = await resolve(request);
		return {
			...resp,
			headers: {
				...resp.headers
			}
		};
	}
	const dbRes = await db.get(cookies.session_id);
	let userSession: { email: string };
	if (dbRes) {
		userSession = JSON.parse(dbRes.toString());
	}
	if (userSession) {
		request.locals = {
			...request.locals,
			authenticated: true,
			email: userSession.email
		};
	} else {
		request.locals.authenticated = false;
	}
	const resp = await resolve(request);
	return {
		status: resp.status,
		headers: {
			...resp.headers
		},
		body: resp.body
	};
};

export const getSession: GetSession = (request) => {
	if (!request.locals.authenticated) {
		return {
			...request.locals,
			authenticated: request.locals.authenticated
		};
	}
	return {
		authenticated: request.locals.authenticated,
		email: request.locals.email
	};
};
