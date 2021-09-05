<script context="module" lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	export async function load({ session }: LoadInput): Promise<LoadOutput> {
		if (!session.authenticated) {
			return {
				status: 302,
				redirect: '/auth/unauthorized'
			};
		}
		const res = await fetch('/user');
		const user = await res.json();
		return {
			props: {
				email: session.email,
				user
			}
		};
	}
</script>

<script lang="ts">
	export let email: any;
	export let user: { name: any };
</script>

<h1>Profile</h1>
{email} <br />
{user.name}
