<script lang="ts">
	import Login from '$lib/components/Login.svelte';
	import Register from '$lib/components/Register.svelte';
	import { goto } from '$app/navigation';

	const goToProfile = () => {
		goto('/profile');
	};
</script>

<main>
	<h1>Authentication Demo using Cookies and stuff. They are Tasty!</h1>
	<Login on:success={goToProfile} />
	<Register on:success={goToProfile} />
</main>

<style>
	h1 {
		color: #fc7100;
	}
</style>
