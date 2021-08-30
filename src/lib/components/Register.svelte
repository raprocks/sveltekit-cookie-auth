<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	let email: string;
	let name: string;
	let password: string;
	let error: string;
	const dispatch = createEventDispatcher();

	async function register() {
		error = undefined;
		try {
			const res = await fetch('/auth/register', {
				method: 'POST',
				body: JSON.stringify({
					email,
					password,
					name
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (res.ok) {
				dispatch('success');
			} else {
				error = 'An error occurred while Registering';
			}
		} catch (e) {
			console.log(`error occured while registering`, e);
			error = 'An error occurred while Registering';
		}
	}
</script>

<h2>Register</h2>
<input type="email" bind:value={email} placeholder="email" />
<input type="name" placeholder="name" bind:value={name} />
<br />
<input type="password" placeholder="password" bind:value={password} />
{#if error}{error}{/if}
<button on:click={register}>Login to Profile</button>
