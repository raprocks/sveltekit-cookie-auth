<script context="module" lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	export async function load({ session, fetch }: LoadInput): Promise<LoadOutput> {
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
	export let email: string;
	export let user: { name: string; email: string };
</script>

<h1>Profile</h1>
{email}
{#if user}
	{user.email} <br />
	{user.name} <br />
{/if}
