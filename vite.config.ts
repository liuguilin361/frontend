import {defineConfig} from 'vite'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({

    plugins: [tailwindcss(), tsconfigPaths()],
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
