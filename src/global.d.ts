/// <reference types="@sveltejs/kit" />

interface ImportMetaEnv {
	VITE_REDIS_PORT: string;
	VITE_REDIS_URL: string;
	VITE_REDIS_PASSWORD: string;
	VITE_REDIS_API_AUTH_KEY: string;
}
