import { Tedis } from 'tedis';
import * as env from '$lib/env';
import type { RequestHandler } from '@sveltejs/kit/types/endpoint';

const db = new Tedis({
	host: env.REDIS_URL,
	password: env.REDIS_PASSWORD,
	port: env.REDIS_PORT
});

export const get: RequestHandler = async (request) => {
	if (!request.locals.authenticated) {
		return {
			status: 401,
			body: {
				message: 'Unidentified'
			}
		};
	}
	const user = JSON.parse((await db.get(request.locals.email)).toString());
	if (!user) {
		return {
			status: 404,
			body: {
				message: 'User Not Found'
			}
		};
	}
	delete user.password;
	return {
		status: 200,
		body: user
	};
};
