import tailwindcss from "@tailwindcss/vite";
import {sveltekit} from "@sveltejs/kit/vite";
import {defineConfig} from "vite";


export default defineConfig({
    plugins: [
        tailwindcss(),
        sveltekit()
    ],
    resolve: {
        alias: {
            'components': '/src/lib/components',
            'components/*': 'src/lib/components/*',
            'utils': '/src/utils',
            'assets': '/src/assets',
            'models': 'src/models',
            'models/*': 'src/models/*',
            'thing': 'src/lib/thing',
            'thing/*': 'src/lib/thing/*',
            'data': 'src/data',
            'data/*': 'src/data/*'
        },
    },
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
                ws: true,
            },
            "/new_things": {
                target: "http://127.0.0.1:8080",
                changeOrigin: true,
                ws: true,
            },
            "/groups": {
                target: "http://127.0.0.1:8080",
                changeOrigin: true,
                ws: true,
            },
            "/extensions": {
                target: "http://127.0.0.1:8080",
                changeOrigin: true,
            },
        },
    },
});
