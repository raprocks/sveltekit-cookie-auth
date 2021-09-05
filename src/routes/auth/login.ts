import stringHash from 'string-hash';
import * as cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid';
import { Tedis } from 'tedis';
import type { EndpointOutput, Request } from '@sveltejs/kit';
import type { ParameterizedBody } from '@sveltejs/kit/types/app';
import * as env from '$lib/env';

const db = new Tedis({
	host: env.REDIS_URL,
	password: env.REDIS_PASSWORD,
	port: env.REDIS_PORT
});
type DBBody = {
	email: string;
	password: number;
};

type LoginBody = ParameterizedBody & DBBody & { password: string };
interface PostData extends Request {
	body: LoginBody;
}

export async function post({ body }: PostData): Promise<EndpointOutput> {
	try {
		const db_res = await db.get(body.email);
		let user: DBBody;
		if (db_res) {
			user = JSON.parse(db_res.toString());
		} else {
			user = undefined;
		}
		if (!user) {
			return {
				status: 401,
				body: {
					message: 'Incorrect email or Password.'
				}
			};
		}
		if (user.password !== stringHash(body.password)) {
			return {
				status: 401,
				body: {
					message: 'Unauthorized'
				}
			};
		}
		const cookieID = uuidv4();
		await db.set(
			cookieID,
			JSON.stringify({
				email: body.email
			})
		);
		const headers = {
			'Set-Cookie': cookie.serialize('session_id', cookieID, {
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 7,
				sameSite: 'lax',
				path: '/'
			})
		};
		return {
			status: 200,
			body: {
				message: 'Logged in'
			},
			headers
		};
	} catch (error) {
		console.log('error occured', error);
	}
}
