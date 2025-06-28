import tailwindcss from '@tailwindcss/vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import {sveltekit} from '@sveltejs/kit/vite';
import {defineConfig} from 'vite';
import adapter from "svelte-adapter-deno"


export default defineConfig({
    plugins: [
        tailwindcss(),
        devtoolsJson(),
        adapter(),
        sveltekit(),
    ],
    server: {
        open: true,
        proxy: {
            "/addons": {
                target: "http://127.0.0.1:8080",
                changeOrigin: true,
            },
            "/things": {
                target: "http://127.0.0.1:8080",
                changeOrigin: true,
                ws: true
            },
            "/groups": {
                target: "http://127.0.0.1:8080",
                changeOrigin: true,
                ws: true
            },
            "/extensions": {
                target: "http://127.0.0.1:8080",
                changeOrigin: true,

            }
        }
    }
});
