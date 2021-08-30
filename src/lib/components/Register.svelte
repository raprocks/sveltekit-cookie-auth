<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	let email;
	let name;
	let password;

	const dispatch = createEventDispatcher();

	async function login() {
		dispatch('success');
	}
</script>

<h2>Register</h2>
<input type="email" bind:value={email} placeholder="email" />
<input type="name" placeholder="name" bind:value={name} />
<br />
<input type="password" placeholder="password" bind:value={password} />
<button on:click={login}>Login to Profile</button>
