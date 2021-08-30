<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	let email: string;
	let password: string;
	let error: string;

	const dispatch = createEventDispatcher();

	async function login() {
		error = undefined;
		try {
			const res = await fetch('/auth/login', {
				method: 'POST',
				body: JSON.stringify({
					email,
					password
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (res.ok) {
				dispatch('success');
			} else {
				error = 'An error occurred while Logging In';
			}
		} catch (e) {
			console.log(`error occured while Login`, e);
			error = 'An error occurred while Logging In';
		}
	}
</script>

<h2>Login</h2>
<input bind:value={email} type="email" placeholder="email" />
<br />
<input type="password" bind:value={password} placeholder="password" />
{#if error}{error}{/if}
<button on:click={login}>Login to Profile</button>

<style>
</style>
