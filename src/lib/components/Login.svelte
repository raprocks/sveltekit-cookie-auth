<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	let email;
	let password;

	const dispatch = createEventDispatcher();

	async function login() {
		dispatch('success');
	}
</script>

<h2>Login</h2>
<input bind:value={email} type="email" placeholder="email" />
<br />
<input type="password" bind:value={password} placeholder="password" />
<button on:click={login}>Login to Profile</button>

<style>
</style>
