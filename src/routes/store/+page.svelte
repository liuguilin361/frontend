<script lang="ts">
    import Dialogbar from "components/dialogbar.svelte";
    import type {AddonDescription} from "models/types";
    import Package from "./package.svelte";

    async function promise(): Promise<Record<string, AddonDescription>> {
        let response = await fetch("/addons/store", {"headers": {"language": "python", "Accept": "application/json"}});
        return response.json();
    }

</script>

<Dialogbar id="store-dialog">Add-on Store</Dialogbar>
{#await promise()}
    <progress class="progress w-full"></progress>
{:then addons}
    {@const list = Object.values(addons)}
    <div hidden={list.length!==0} role="alert" class="alert alert-warning">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <span>No matched add-on was found</span>
    </div>
    {#each list as addon}
        <Package {addon}></Package>
    {/each}
{:catch error}
    <div role="alert" class="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>Load Add-on failed ,Error:{error}</span>
    </div>
{/await}
<div class="h-full  w-full">


</div>
