<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import Api from "models/api";
    import type {AddonManifest} from "models/types";
    import Addon from "./addon.svelte";
    let promise = Api.getInstalledAddons<AddonManifest>();
</script>

<Navbar>Addon</Navbar>


{#await promise}
    <progress class="progress w-full" value="0" max="100"></progress>
{:then addons}
    {#each Object.values(addons) as addon}
        <Addon {addon}></Addon>
    {/each}
{/await}
