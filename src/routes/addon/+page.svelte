<script lang="ts">
    import Api from "models/api";
    import type {AddonManifest} from "models/types";
    import "./addon-item.ts";
    import "components/layout/addon-layout.ts";

    let promise = Api.getInstalledAddons<AddonManifest>();
</script>




{#await promise}
    <progress class="progress w-full" value="0" max="100"></progress>
{:then addons}
    <addon-layout>
        {#each Object.values(addons) as addon}
            <addon-item addon={addon}></addon-item>
        {/each}
    </addon-layout>
{/await}
