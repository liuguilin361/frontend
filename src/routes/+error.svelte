<script lang="ts">
    import {navigating, page} from '$app/state';
    import Navbar from '../components/navbar.svelte';

    let from = $derived(navigating.from?.url.pathname);
    let to = $derived(navigating.to?.url.pathname);
    let url = $derived(page.url.pathname);

</script>

<Navbar>Error Page</Navbar>
<div class="alert alert-error" role="alert">
    <svg class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="2"/>
    </svg>
    <span>Path:{url}</span>
    <span>Error:{page.error?.message}</span>
</div>

