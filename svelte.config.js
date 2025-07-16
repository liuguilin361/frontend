
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    preprocess: vitePreprocess(),
    kit: {
        alias: {
            'models': 'src/models',
            'models/*': 'src/models/*',
            'components': 'src/lib/components',
            'components/*': 'src/lib/components/*',
            'thing': 'src/lib/thing',
            'thing/*': 'src/lib/thing/*',
            'data': 'src/data',
            'data/*': 'src/data/*'
        },
        // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
        // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
        // See https://svelte.dev/docs/kit/adapters for more information about adapters.

    }
};

export default config;
